export default function () {}

export async function getServerSideProps(context: any) {
  return {
    redirect: {
      permanent: false,
      destination: context.resolvedUrl + "/button",
    },
  };
}
