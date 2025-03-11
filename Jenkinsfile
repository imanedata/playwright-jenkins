pipeline {
    agent {
        docker {
            image 'mcr.microsoft.com/playwright:v1.51.0-noble'
            args '--entrypoint=""'
        }
    }
    stages {
        stage('Install Java & Allure') {
            steps {
                sh 'apt-get update && apt-get install -y openjdk-17-jdk'
                sh 'export JAVA_HOME=/usr/lib/jvm/java-17-openjdk-amd64'
                sh 'echo "export JAVA_HOME=/usr/lib/jvm/java-17-openjdk-amd64" >> ~/.bashrc'
                
                sh 'npm install -g allure-commandline --save-dev'
                sh 'echo "PATH=$PATH:$(npm bin -g)" >> ~/.bashrc'
            }
        }
        stage('Checkout code & Install dependencies') {
            steps {
                git 'https://github.com/eroshenkoam/allure-example.git'
                sh 'npm ci'
            }
        }
        stage('Run tests') {
            steps {
                sh './gradlew clean test'
            }
        }
        stage('Génération de rapport Allure') {
            steps {
                sh 'allure generate allure-results --clean -o allure-report'
            }
        }
    }
    post {
        always {
            archiveArtifacts artifacts: 'build/allure-results/**', fingerprint: true
            archiveArtifacts artifacts: 'allure-report/**', fingerprint: true
            
            allure includeProperties: false, jdk: '', results: [[path: 'build/allure-results']]
        }
    }
}
