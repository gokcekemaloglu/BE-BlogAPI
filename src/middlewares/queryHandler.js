"use strict";

module.exports = async (req, res, next) => {

    // FILTERING &  SEARCHING & SORTING & PAGINATION
    
    // Filtering:
    // URL?filter[fieldName1]=value1&filter[fieldName2]=value2
    const filter = req.query?.filter || {};
    // console.log(req.query);
    
    // Searching:
    // URL?search[fieldName1]=value1&search[fieldName2]=value2
    // https://www.mongodb.com/docs/manual/reference/operator/query/regex/
    // console.log(req.query);
    const search = req.query?.search || {};
    // console.log("search-->", search)
    
    // { "<field>": { "$regex": "pattern" } }
    
    for (let key in search) 
        search[key] = { $regex: search[key] };
    // console.log(search["key"]) //????
    // console.log(key)
    
    /* ------------------------------------------------------- */
    
    // Sorting:
    // URL?sort[fieldName]=asc&sort[fieldName2]=desc
    const sort = req.query?.sort || {};
    // console.log(req.query);
    // console.log(sort);
    
    /* ------------------------------------------------------- */
    
    // Pagination:
    // URL?page=1&limit=10
    
    // Limit:
    let limit = Number(req.query?.limit);
    limit = limit > 0 ? limit : 20;
    
    // Page:
    let page = Number(req.query?.page) || 1;
    page = page > 0 ? page : 1;
    
    // Skip:
    let skip = Number(req.query?.skip);
    skip = skip > 0 ? skip : ((page - 1) * limit);
    
    // console.log(typeof limit)
    
    // console.log("limit-->", limit)
    // console.log("page-->", page)
    // console.log("skip-->", skip)

    res.getModelList = async function (Model, populate = null) {

        return await Model.find({ ...filter, ...search })
          .sort(sort)
          .limit(limit)
          .skip(skip)
          .populate(populate)        
    }

    res.getModelListDetails = async (Model) => {
        const data = Model.find({...filter, ...search})
        const details = {
            filter,
            search,
            sort,
            skip,
            limit,
            page,
            pages: {
                previous: (page > 1 ? page - 1 : false),
                current: page,
                next: page + 1,
                total: Math.ceil(data.length / limit)
            },
            totalRecord: data.length
        }
        return details
    }
    
    // SELECT & POPULATE:
    // const result = await BlogPost.find({...search-filter},{...select})
    // const result = await BlogPost.find({}, { categoryId: true, title: true, content: true, _id: false }).populate('categoryId') // default --> _id : true
    next()
}

