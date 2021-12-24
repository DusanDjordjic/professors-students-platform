# Implementacija

Koraci navedeni sa f-broj moraju da se poklapaju kod frontend i backend strane

# Backend

## F-1 Signup i Login

### Signup

- Signup profesora i studneta.
- Profesori i studneti se cuvaju u posebnim tabelama.
- Moraju imati sva polja popunjena.
- Mora zadovoljavati potrebe modela.
- Profesor za cenu moze da stavi : besplatno i da doda dugme za doniranje ili da stavi cenu.
- Ukoliko hoce da stavi cenu bira koje ce to cene biti: Mesecna, Godisnja, Zivotna.
- Ukoliko su sve cene 0 profesor besplatno daje svoje znanje (mogucnost cuvanja free:boolean / **Razmatranje**)

### Login

- Login profesora i studenta
- Validiraju se poslati podaci
- Genereise se JWT Token koji se vraca frontend-u

## F-2 GET getAllProfesors

- getAllPrefesors?sort=rating&sortDirection=desc&filter={"priceFrom":100, "priceTo":200}
  - Vraca filtriran niz profesora sortiran po naznacenoj koloni i po naznacenom redosledu. Ukoliko ne postoji filter onda vraca sve profesore. Ukoliko ne postoji sort onda ih ne sortira
