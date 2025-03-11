import { Footer } from '@/components/ui/Footer';

interface Props {
  params: Promise<{ username: string }>;
}

export default async function ProfileUserPage({ params }: Props) {
  const { username } = await params;

  return (
    <div>
      <h1>{username}</h1>
      <Footer />
    </div>
  );
}
