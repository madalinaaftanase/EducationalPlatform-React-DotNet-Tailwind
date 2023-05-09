using AutoMapper;

namespace PlatformaEducationala.Data.Repositories;

public static class MapperModels<TSource, TDestination>
{
    private static readonly IMapper _mapper;

    static MapperModels()
    {
        var configuration = new MapperConfiguration(cfg => { cfg.CreateMap<TSource, TDestination>(); });
        _mapper = configuration.CreateMapper();
    }

    public static TDestination Map(TSource source)
    {
        return _mapper.Map<TSource, TDestination>(source);
    }

    public static TDestination Map(TSource source, Action<IMappingExpression<TSource, TDestination>> configure)
    {
        var configuration = new MapperConfiguration(cfg =>
        {
            cfg.CreateMap<TSource, TDestination>();
            configure(cfg.CreateMap<TSource, TDestination>());
        });
        var mapper = configuration.CreateMapper();
        return mapper.Map<TSource, TDestination>(source);
    }

    public static List<TDestination> MapList(List<TSource> sourceList)
    {
        return sourceList.Select(source => Map(source)).ToList();
    }
}