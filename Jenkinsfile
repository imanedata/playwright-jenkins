pipeline {
    agent {
        docker {
            image 'playwright'
        }
    }
    stages{
        stages{
        stage('installation'){
            steps{
                sh 'npm-ci'
            }
        }
        stage('run'){
            steps{
                sh 'npx playwright test Runs the end-to-end tests'
            }
        }
        stage('run chrome '){
            steps{
                sh 'npx playwright test --project=chromium'
            }
        }
        
    }
    

}