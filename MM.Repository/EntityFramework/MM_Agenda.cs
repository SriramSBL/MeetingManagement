//------------------------------------------------------------------------------
// <auto-generated>
//     This code was generated from a template.
//
//     Manual changes to this file may cause unexpected behavior in your application.
//     Manual changes to this file will be overwritten if the code is regenerated.
// </auto-generated>
//------------------------------------------------------------------------------

namespace MM.Repository.EntityFramework
{
    using System;
    using System.Collections.Generic;
    
    public partial class MM_Agenda
    {
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2214:DoNotCallOverridableMethodsInConstructors")]
        public MM_Agenda()
        {
            this.MM_Agenda1 = new HashSet<MM_Agenda>();
            this.MM_Minute = new HashSet<MM_Minute>();
        }
    
        public int Id { get; set; }
        public string Title { get; set; }
        public int MeetingId { get; set; }
        public Nullable<int> HeadingId { get; set; }
        public string SerialId { get; set; }
        public Nullable<int> OrderId { get; set; }
        public Nullable<bool> IsCompleted { get; set; }
    
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<MM_Agenda> MM_Agenda1 { get; set; }
        public virtual MM_Agenda MM_Agenda2 { get; set; }
        public virtual MM_Meeting MM_Meeting { get; set; }
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<MM_Minute> MM_Minute { get; set; }
    }
}
