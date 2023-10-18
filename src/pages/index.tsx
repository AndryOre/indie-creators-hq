import { signIn, signOut, useSession } from "next-auth/react";
import Head from "next/head";
import Link from "next/link";

import { api } from "@/utils/api";

export default function Home() {
  const hello = api.post.hello.useQuery({ text: "from tRPC" });

  return (
    <>
      <Head>
        <title>Indie Creators HQ</title>
        <meta
          name="description"
          content="Únete a nuestra comunidad de Creadores Independientes y construye proyectos innovadores. Descubre tu potencial creativo con nosotros."
        />
        <link rel="icon" href="/favicon.svg" />

        <meta
          name="keywords"
          content="Creadores Independientes, Comunidad, Proyectos Innovadores, Hispanos, Colaboración"
        />
        <meta
          name="news_keywords"
          content="Creadores Independientes, Comunidad, Proyectos Innovadores, Hispanos, Colaboración"
        />

        <meta name="author" content="Serudda" />

        <meta property="og:type" content="website" />
        <meta property="og:title" content="Indie Creators HQ" />
        <meta
          property="og:description"
          content="Únete a nuestra comunidad de Creadores Independientes y construye proyectos innovadores. Descubre tu potencial creativo con nosotros."
        />
        <meta
          property="og:url"
          content="https://indie-creators-hq.vercel.app"
        />
        <meta
          property="og:image"
          content="https://res.cloudinary.com/dhwxnbnaj/image/upload/v1697662035/Indie%20Creatos%20HQ/Indie_Creators_HQ_t48m20.png"
        />
        <meta property="og:site_name" content="Indie Creators HQ" />

        <meta name="twitter:card" content="summary_large_image" />
        <meta
          name="twitter:site"
          content="https://indie-creators-hq.vercel.app"
        />
        <meta name="twitter:creator" content="Serudda" />
        <meta name="twitter:title" content="Indie Creators HQ" />
        <meta
          name="twitter:description"
          content="Únete a nuestra comunidad de Creadores Independientes y construye proyectos innovadores. Descubre tu potencial creativo con nosotros."
        />
        <meta
          name="twitter:image"
          content="https://res.cloudinary.com/dhwxnbnaj/image/upload/v1697662035/Indie%20Creatos%20HQ/Indie_Creators_HQ_t48m20.png"
        />
      </Head>
      <main className=" flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#2e026d] to-[#15162c]">
        <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16 ">
          <h1 className="text-5xl font-extrabold tracking-tight text-white sm:text-[5rem]">
            Create <span className="text-[hsl(280,100%,70%)]">T3</span> App
          </h1>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:gap-8">
            <Link
              className="flex max-w-xs flex-col gap-4 rounded-xl bg-white/10 p-4 text-white hover:bg-white/20"
              href="https://create.t3.gg/en/usage/first-steps"
              target="_blank"
            >
              <h3 className="text-2xl font-bold">First Steps →</h3>
              <div className="text-lg">
                Just the basics - Everything you need to know to set up your
                database and authentication.
              </div>
            </Link>
            <Link
              className="flex max-w-xs flex-col gap-4 rounded-xl bg-white/10 p-4 text-white hover:bg-white/20"
              href="https://create.t3.gg/en/introduction"
              target="_blank"
            >
              <h3 className="text-2xl font-bold">Documentation →</h3>
              <div className="text-lg">
                Learn more about Create T3 App, the libraries it uses, and how
                to deploy it.
              </div>
            </Link>
          </div>
          <div className="flex flex-col items-center gap-2">
            <p className="text-2xl text-white">
              {hello.data ? hello.data.greeting : "Loading tRPC query..."}
            </p>
            <AuthShowcase />
          </div>
        </div>
      </main>
    </>
  );
}

function AuthShowcase() {
  const { data: sessionData } = useSession();

  const { data: secretMessage } = api.post.getSecretMessage.useQuery(
    undefined, // no input
    { enabled: sessionData?.user !== undefined },
  );

  return (
    <div className="flex flex-col items-center justify-center gap-4">
      <p className="text-center text-2xl text-white">
        {sessionData && <span>Logged in as {sessionData.user?.name}</span>}
        {secretMessage && <span> - {secretMessage}</span>}
      </p>
      <button
        className="rounded-full bg-white/10 px-10 py-3 font-semibold text-white no-underline transition hover:bg-white/20"
        onClick={sessionData ? () => void signOut() : () => void signIn()}
      >
        {sessionData ? "Sign out" : "Sign in"}
      </button>
    </div>
  );
}
