
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


    public StudentsRepository(PlatformDBContext platformDbContext, IMapper mapper)
    {
        _platformDbContext = platformDbContext;
        _mapper = mapper;
    }

    public async Task AddAsync(Student account)
    {
        await _platformDbContext.AddAsync(account);
        await _platformDbContext.SaveChangesAsync();
    }

    public async Task<StudentDto> GetByEmail(string email)
    {
      var student =  _platformDbContext.Students.FirstOrDefaultAsync(s =>s.Email==email);
      return student == null ? null : _mapper.Map<StudentDto>(student);
    }

    public async Task<List<StudentDto>> GetAll()
    {
        var students = _platformDbContext.Students.ToListAsync();
        return _mapper.Map<List<StudentDto>>(students);
    }

}
