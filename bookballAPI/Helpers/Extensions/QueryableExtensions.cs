using System.Collections.Generic;
using System.Linq;
using bookballAPI.Common.Models;

namespace bookballAPI.Helpers.Extensions
{
    public static class QueryableExtensions
    {
        public static (IList<T> data, PagingModel paging) ToPaging<T>(this IQueryable<T> source, IPagingSizeModel model)
        {
            var skip = (model.page - 1) * model.size;
            var totalRecord = source.Count();
            var totalPage = totalRecord / model.size;
            if (totalRecord % model.size != 0)
            {
                totalPage++;
            }
            var data = source.Skip(skip).Take(model.size).ToList();
            var paging = new PagingModel()
            {
                page = model.page,
                size = model.size,
                totalPage = totalPage,
                count = totalRecord,
                order = model.order
            };
            return (data, paging);
        }
    }
}