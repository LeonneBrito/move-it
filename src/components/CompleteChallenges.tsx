import { useContext } from 'react'
import { ChallengesContext } from '../contexts/ChallengesContext'
import styles from '../styles/components/CompleteChallenges.module.scss'

export function CompleteChallenges () {

  const { challengesComplete } = useContext(ChallengesContext)

  return (
    <div className={styles.completeChallengesContainer}> 
      <span>Desafios Completos</span>
      <span>{ challengesComplete }</span>
    </div>
  )
}