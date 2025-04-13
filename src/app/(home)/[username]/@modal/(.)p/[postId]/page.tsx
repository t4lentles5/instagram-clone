type Props = {
  params: Promise<{
    postId: string;
  }>;
};

export default async function Photo({ params }: Props) {
  const { postId } = await params;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="rounded-xl bg-white p-4">
        <h2>Post ID: {postId}</h2>
      </div>
    </div>
  );
}
