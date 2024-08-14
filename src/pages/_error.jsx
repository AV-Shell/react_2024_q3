export default function Error({ statusCode }) {
  return <>Something went wrong, {statusCode}</>;
}

Error.getInitialProps = ({ res, err }) => {
  const statusCode = res ? res.statusCode : err ? err.statuscCode : 404;

  return { statusCode };
};
