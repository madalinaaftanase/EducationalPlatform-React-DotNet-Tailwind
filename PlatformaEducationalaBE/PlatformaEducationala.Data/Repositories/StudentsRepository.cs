using AutoMapper;
using PlatformaEducationala.Core.Repositories;
using PlatformaEducationala.Core.User.Models;
using PlatformaEducationala.Data.Context;
using Microsoft.EntityFrameworkCore;
using PlatformaEducationala.Core.Entities;

namespace PlatformaEducationala.Data.Repositories;

public class StudentsRepository : IStudentRepository
{
    private readonly PlatformDBContext _platformDbContext;
    private readonly IMapper _mapper;


    public StudentsRepository(PlatformDBContext platformDbContext)
    {
        _platformDbContext = platformDbContext;
        _mapper = new MapperConfiguration(cfg =>
        {
            cfg.CreateMap<Student, StudentDto>();
        }).CreateMapper();
    }

    public async Task AddAsync(Student account)
    {
        await _platformDbContext.AddAsync(account);
        await _platformDbContext.SaveChangesAsync();
    }

    public async Task<StudentDto> GetByEmail(string email)
    {
      var student =  await _platformDbContext.Students.FirstOrDefaultAsync(s =>s.Email==email);

      return student==null? null:_mapper.Map<StudentDto>(student);
    }

    public async Task<List<StudentDto>> GetAll()
    {
        var students = await _platformDbContext.Students.ToListAsync();
        return _mapper.Map<List<StudentDto>>(students);
    }

}
