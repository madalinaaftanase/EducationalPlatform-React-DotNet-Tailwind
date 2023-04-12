
using Microsoft.EntityFrameworkCore;
using PlatformaEducationala.Core.Entities;
using PlatformaEducationala.Core.Group.Models;
using PlatformaEducationala.Core.Group.Queries.Get;
using PlatformaEducationala.Core.Repositories;
using PlatformaEducationala.Data.Context;

namespace PlatformaEducationala.Data.Repositories
{
    public class GroupsRepository : IGroupRepository
    {
        private readonly PlatformDBContext _platformDbContext;

        public GroupsRepository(PlatformDBContext platformDbContext)
        {
            _platformDbContext = platformDbContext;
        }
        
        public async Task<List<GroupDto>> GetAll(GetQuery query)
        {
            var result = new List<GroupDto>();
            if (query.IsTeacher)
            {
                var teacherGroups = await _platformDbContext.Groups
                        .Where(t => t.TeacherId.Equals(query.CurrentUserId)).ToListAsync();
                result = MapperModels<Group, GroupDto>.MapList(teacherGroups);

                return result;
            }
            
            var groups = await _platformDbContext.StudentGroups
                .Include(sg => sg.Group)
                .Where(sg => sg.StudentId == query.CurrentUserId)
                .Select(sg => sg.Group)
                .ToListAsync();

            result = MapperModels<Group, GroupDto>.MapList(groups);
                return result;
         
        }
    }
}
