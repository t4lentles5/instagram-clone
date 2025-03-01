interface Props {
  params: Promise<{ username: string }>;
}

export default async function ProfileUserPage({ params }: Props) {
  const { username } = await params;

  return (
    <>
      <h1>{username}</h1>
    </>
  );
}
