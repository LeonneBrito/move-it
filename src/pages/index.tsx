import Head from 'next/head'
import styles from "../styles/pages/Home.module.scss"
import { GetServerSideProps } from 'next'

import { CountdownProvider } from '../contexts/CountdownContext'
import { ChallengesProvider } from '../contexts/ChallengesContext'

import { CompleteChallenges } from "../components/CompleteChallenges"
import { ChallengeBox } from "../components/ChallengeBox"
import { ExperienceBar } from "../components/ExperienceBar"
import { Countdown } from "../components/Countdown"
import { Profile } from "../components/Profile"

import { signIn, useSession } from 'next-auth/client'
import { FiLogIn } from 'react-icons/fi'
import { Sidebar } from '../components/Sidebar'


interface HomeProps {
  level: number;
  currentExperience: number;
  challengesComplete: number;
}

export default function Home(props: HomeProps): JSX.Element {

  const [ session, loading ] = useSession()

  return <>
    {!session && <>
      <div className={styles.signContainer}>
        <Head>
          <title>Login | move.it</title>
        </Head>
        <main>
          <img src="Logo.svg" alt="Move it" />
          <strong>Bem vindo</strong>
          <div className={styles.auth}>
            <FiLogIn size={32} color="#B2B9FF"/>
            <span>Faça sua autenticação para começar.</span>
          </div>
          <button 
            onClick={() => signIn('auth0')}
            className={styles.signButton}
          >
            Sign in
          </button>
        </main>
      </div>
      
    </>}
    {session && <>
    <Sidebar />
    <ChallengesProvider
      level={props.level}
      currentExperience={props.currentExperience}
      challengesComplete={props.challengesComplete}
    >
      <div className={styles.container}>
        <Head>
          <title>{session.user.name} | move.it</title>
        </Head>
        <ExperienceBar />

        <CountdownProvider>
          <section>
            <div>
              <Profile 
                name={session.user.name}
                avatar_url={session.user.image}
              />
              <CompleteChallenges />
              <Countdown />
            </div>
            <div>
              <ChallengeBox />
            </div>
          </section>
        </CountdownProvider>
      </div>
    </ChallengesProvider>
    </>}
  </>
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {

  const {
    level,
    currentExperience,
    challengesComplete
  } = ctx.req.cookies;

  return {
    props: {
      level: Number(level),
      currentExperience: Number(currentExperience),
      challengesComplete: Number(challengesComplete)
    }
  }

}