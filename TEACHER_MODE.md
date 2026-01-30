# Teacher Mode Access Guide

## How to Access Teacher Mode

Teacher Mode is currently accessible via a **query parameter** - no special permissions needed.

### For Any User (Including Students)

Simply add `?teacher=1` to any exercise URL:

```
/exercise/l1-easy-1?teacher=1
```

This will show the analytics panel in the bottom-right corner with:
- Number of attempts
- Time spent
- Hints used
- Error codes encountered

---

## Making It Teacher-Only (Optional Enhancement)

If you want to restrict Teacher Mode to specific users, here are two approaches:

### Option 1: Add a `is_teacher` field to profiles

1. **Update profiles table**:
```sql
-- Add to supabase/migrations/0005_teacher_role.sql
alter table profiles add column is_teacher boolean default false;
```

2. **Update TeacherMode component** to check the role:
```tsx
const [isTeacher, setIsTeacher] = useState(false);

useEffect(() => {
  async function checkTeacherRole() {
    const { data: { session } } = await supabase.auth.getSession();
    if (session?.user) {
      const { data } = await supabase
        .from('profiles')
        .select('is_teacher')
        .eq('id', session.user.id)
        .single();
      setIsTeacher(data?.is_teacher || false);
    }
  }
  checkTeacherRole();
}, []);

// Then in the component:
if (!isTeacher) return null;
```

3. **Manually set teachers** in Supabase dashboard:
   - Go to Table Editor → profiles
   - Find the user
   - Set `is_teacher = true`

### Option 2: Use email whitelist

Simpler approach - check if user email is in a list:

```tsx
const TEACHER_EMAILS = [
  'teacher@example.com',
  'admin@example.com',
];

const isTeacher = TEACHER_EMAILS.includes(session?.user?.email || '');
```

---

## Current Implementation

Right now, **anyone can access Teacher Mode** with `?teacher=1`. This is fine for:
- Testing
- Self-review by students
- Small, trusted groups

If you need proper access control, implement one of the options above.
