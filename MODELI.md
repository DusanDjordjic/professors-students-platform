# Model profesora

Svaki profesor mora da ima

- \_id : string/ObjectId
- name : string
- lastName : string
- rating : number
- prices :\[monthPrice, yearprice, lifetimePrice\]
- subjects : \[ math, javascript, programming\] (lista predmeta koje profesor predaje)
- password : string

# Model studenta

- \_id : string/ObjectId
- name : string
- lastName : string
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
- expiraionDate : date
- subject : string

ZA POCETAK DOSTA
