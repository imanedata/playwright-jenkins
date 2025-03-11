pipeline{
    agent{
        docker{
            image 'mcr.microsoft.com/playwright:v1.51.0-noble'
        }
    }
    stages{
        stage('install dependencies'){
            steps{
                sh 'npm ci'
            }
        }
        stage('run tests'){
            steps{
                sh 'npx playwright test'
            }
        }
        stage('génération de rapport'){
            steps{
                //sh 'npx playwright show-report'
                sh 'npx playwright test --reporter=html'
            }
        }
    }
    post{
        always{
            archiveArtifacts artifacts: 'playwright-report/**', fingerprint: true
            publishHTML(target: [
            allowMissing: false,
            alwaysLinkToLastBuild: false,
            keepAll: true,
            reportDir: 'playwright-report',
            reportFiles: 'index.html',
            reportName: 'Playwright Report'
            ])
        }
    }
}