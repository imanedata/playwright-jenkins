pipeline {
    agent {
        docker 
        { image 'mcr.microsoft.com/playwright:v1.51.0-noble'
        args "--entrypoint=''"
         }
        }

    stages {
        stage('Installation') {
            steps {
                sh 'npm ci'
                sh 'npx playwright test'
            }
        }
        
    }
}

