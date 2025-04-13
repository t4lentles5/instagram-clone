type Props = {
  params: Promise<{
    postId: string;
  }>;
};

export default async function Photo({ params }: Props) {
  const { postId } = await params;

  return <div className="mt-2 grid place-content-center">{postId}</div>;
}
