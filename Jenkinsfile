pipeline {
    agent any

    stages {

        stage('Build Frontend Image') {
            steps {
                sh 'docker build -t pantrychef-frontend ./frontend'
            }
        }

        stage('Build Backend Image') {
            steps {
                sh 'docker build -t pantrychef-backend ./backend'
            }
        }

        stage('Verify Images') {
            steps {
                sh 'docker images'
            }
        }
    }
}