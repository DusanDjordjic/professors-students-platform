# Model profesora

- \_id : string/ObjectId
- name : string
- lastName : string
- username : string
- email : string
- phoneNumber : string
- rating : number
- prices :\[monthPrice, yearPrice, lifetimePrice\]
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

# Model pretplata

- \_id : string
- professorId : string
- studnetId : string

# Model lekcija

- \_id : string
- professorId : string
- createdDate : date
- text : {title, content, footer}
- description: string
