# Model profesora

- \_id : string/ObjectId
- name : string
- lastName : string
- username : string
- email : string
- phoneNumber : string
- rating : number
- price : number
- subjects : \[ math, javascript, programming\] (lista predmeta koje profesor predaje)
- password : string

# Model studenta

- \_id : string/ObjectId
- name : string
- lastName : string
- username : string
- email : string
- phoneNumber : string
- intrests : \[math, javascript\] (lista interesovanja)
- password : string

# Model komentara

- \_id : string
- professorId : string
- studnetId : string
- title : string
- createdDate : date
- text : string
- rating : number

# Model predmeta

- \_id : string
- subjectName : string

# TODO Model pretplata

- \_id : string
- professorId : string
- studnetId : string
