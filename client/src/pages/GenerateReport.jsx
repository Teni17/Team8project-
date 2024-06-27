import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

const GenerateReport = () => {
    const [reportURL, setReportURL] = useState(null)
    const navigate = useNavigate()

    useEffect(() => {
        const fetchReport = async () => {
            try {
                // get the report and set it to reportURL
                const response = await fetch('https://localhost:5050/generate-report')
                const blob = await response.blob();
                const url = window.URL.createObjectURL(new Blob([blob]))
                setReportURL(url)
            }
            catch (error) {
                // send error if it occurs
                console.error('Error generating report:', error)
            }
        }

        fetchReport()
    }, [])

    const handleHomeClick = () => {
        navigate('/home')
    }

    return (
        <div className="generate-report">
            <div className="header">
                <h2>Generate Report</h2>
                <button onClick={handleHomeClick}>Home</button>
            </div>
            <div className="content">
            <p>Click to download the report below:</p>
                {reportURL ? (
                    <a className="download-link" href={reportURL} download="report.pdf">Download Report</a>
                ) : (
                    <p>Loading...</p>
                )}
            </div>
        </div>
    )
}

export default GenerateReport