using Microsoft.AspNetCore.Mvc;

namespace bookballAPI.Common.Models
{
    public interface IPagingSizeModel
    {
        string order { get; set; }

        int page { get; set; }

        int size { get; set; }

    }

    public interface IPagingCountModel
    {
        int? totalPage { get; set; }
        long? count { get; set; }
    }

    public class PagingModel : IPagingSizeModel, IPagingCountModel
    {
        public string order { get; set; }
        public int page { get; set; }
        public int size { get; set; }
        public int? totalPage { get; set; }
        public long? count { get; set; }
    }

    public class WhereModel
    {
        public virtual string where { get; set; }
    }

    public class SearchModel : WhereModel, IPagingSizeModel
    {
        public SearchModel()
        {
            order = null;
            page = 1;
            size = 10;
        }

        public virtual string order { get; set; }
        public virtual int page { get; set; }
        public virtual int size { get; set; }
    }

    public class ResultModel<T>
    {
        public SerializableError error { get; set; }
        public T data { get; set; }
        public PagingModel paging { get; set; }
    }

    public class ErrorModel
    {
        public string key { get; set; }

        public string value { get; set; }
    }
}