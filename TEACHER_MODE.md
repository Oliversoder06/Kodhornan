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

### Option 1: Use Supabase user metadata

1. **Set user metadata**:
   - Go to Authentication -> Users
   - Edit user -> Metadata
   - Add `{"is_teacher": true}`

2. **Update TeacherMode component** to check the metadata:
```tsx
const [isTeacher, setIsTeacher] = useState(false);

useEffect(() => {
  async function checkTeacherRole() {
    const { data: { session } } = await supabase.auth.getSession();
    if (session?.user?.user_metadata?.is_teacher) {
      setIsTeacher(true);
    }
  }
  checkTeacherRole();
}, []);

// Then in the component:
if (!isTeacher) return null;
```

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
