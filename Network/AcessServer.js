export default {
    gateway:(window.location.hostname==="127.0.0.1")?"http://localhost:3030":"https://xadrez-server.herokuapp.com",
    apiVersion:"/api/v1"
}