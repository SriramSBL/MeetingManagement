using System;

namespace MM.Core.Entities
{
    public class MeetingMember
    {
        public int Id { get; set; }
        public User Member { get; set; }
        public Meeting Meeting { get; set; }
        public MeetingMemberType MemberAs { get; set; }
        public Nullable<bool> IsAttend { get; set; }
    }
}
