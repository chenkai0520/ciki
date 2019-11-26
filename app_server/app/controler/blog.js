const {
    code,
} = require('../utils/config');
const blogModel = require('../model/blog');
const userModel = require('../model/user');

async function create(ctx, next) {

    if (!ctx.user || !ctx.user.id) {
        return ctx.body = ctx.error(code.NOT_EXISTED, '用户不存在');
    }

    let {
        content,
        tag,
        title
    } = ctx.request.body;

    let rule = {
        content: {
            type: 'string',
        },
        tag: {
            type: 'string',
            required: false
        },
        title: {
            type: 'string',
            required: false
        }
    }


    let error = ctx.parameter.validate(rule, {
        content,
        tag,
        title
    });
    if (error) {
        return ctx.body = ctx.error(code.ILLEGAL_PARAMETER, error);
    }

    let short = content.slice(0, 120);
    let thumb = content.match(/!\[(.*?)\]\((.*?)\)/)[2];
    let result = await blogModel.create(ctx.user.id, {
        content,
        tag,
        title
    }, thumb, short);

    if (result) {
        return ctx.body = ctx.ok(code.SUCCESS, {
            id: result
        });
    }
    return ctx.body = ctx.error(code.UNKNOWN_MISTAKE, '未知错误');
}

async function list(ctx, next) {
    let {
        blogUserID
    } = ctx.params;

    blogUserID = Number(blogUserID);
    let {
        limit,
        page,
        search
    } = ctx.query;

    limit = limit !== undefined ? Number(limit) : 10;
    page = page !== undefined ? Number(page) : 0;

    let rule = {
        blogUserID: {
            type: 'number',
            min: 0,
        },
        limit: {
            type: 'number',
            min: 1,
            max: 100,
        },
        page: {
            type: 'number',
            min: 0,
        },
        search: {
            type: 'string',
            required: false,
        }
    }
    let data = {
        blogUserID,
        limit,
        page,
        search
    }
    let error = ctx.parameter.validate(rule, data);

    if (error) {

        return ctx.body = ctx.error(code.ILLEGAL_PARAMETER, error);
    }

    let user = await userModel.getByID(blogUserID);
    if (!user) {

        return ctx.body = ctx.error(code.NOT_EXISTED, '用户不存在');
    }


    let result = await blogModel.list(limit + 1, limit * page);

    if (result) {

        let isMore = result.length === limit + 1;

        if (isMore) {
            result.pop();
        }
        let dataList = {
            limit: limit,
            page: page,
            data: result,
            next: isMore
        }
        return ctx.body = ctx.ok(code.SUCCESS, dataList);
    }

    return ctx.body = ctx.error(code.UNKNOWN_MISTAKE, '未知错误');
}
module.exports = {
    create,
    list
};