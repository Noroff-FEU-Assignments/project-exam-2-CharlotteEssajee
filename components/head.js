import NextHead from "next/head";

export default function Head({ title = "", description = "", }) {
  return (
    <NextHead>
      <title>
        {title}
        {title ? " " : ""}
      </title>
      <meta name="description" content={description} />
    </NextHead>
  );
}