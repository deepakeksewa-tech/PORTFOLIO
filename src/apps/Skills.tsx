import { resume } from '../data/resume';
import { Card, Chip } from '../components/ui';

export default function Skills() {
  return (
    <div className="grid gap-4 p-5 sm:grid-cols-2 md:p-7">
      {resume.skills.map((g) => (
        <Card key={g.title} title={g.title}>
          <div className="flex flex-wrap gap-1.5">{g.items.map((s) => <Chip key={s}>{s}</Chip>)}</div>
        </Card>
      ))}
    </div>
  );
}
