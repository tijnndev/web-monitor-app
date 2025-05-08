import { useEffect, useState } from 'react'
import styles from './Dashboard.module.css'
import axios from 'axios'
import {requestNotificationPermission} from '../notifications'

export default function Dashboard() {
  const [services, setServices] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    async function fetchServices() {
      try {
        const response = await axios.get(import.meta.env.VITE_API_URL + '/services')
        setServices(response.data)
      } catch (error) {
        console.error('Error fetching services:', error)
        setError('Error fetching services')
      } finally {
        setLoading(false)
      }
    }

    fetchServices()
  }, [])

  const openUrl = (url) => {
    window.open(url, '_blank')
  }

  const handleRegisterToken = async () => {
    await requestNotificationPermission()
  }

  return (
    <div className={styles.container}>
        {loading ? (
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
            <h1>Loading services..</h1>
            <div className={styles.spinner}></div>
          </div>
        ) : error ? (
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
            <h1 style={{ color: 'red' }}>Error loading services</h1>
            <p>{error}</p>
          </div>
        ) : (
          <>
            <div className={styles.card}>
              <div className={styles.cardSection}>
                <div className="text-h6">Monitoring Services</div>
              </div>

              <div className={styles.cardSection}>
                <ul className={styles.list}>
                  {services.map(service => (
                    <li key={service.url} className={styles.listItem} onClick={() => openUrl(service.url)}>
                      <div className={styles.listItemContent}>
                        <span className={styles.serviceName}>{service.name}</span>
                        <span className={styles.serviceUrl}>{service.url}</span>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>

              <div className={styles.cardSection}>
                <button className={styles.button} onClick={handleRegisterToken}>
                  Register FCM Token
                </button>
              </div>
            </div>
          </>
        )}
    </div>
  )
}
