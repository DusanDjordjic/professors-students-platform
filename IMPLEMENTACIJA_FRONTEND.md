# Implementacija

Koraci navedeni sa f-broj moraju da se poklapaju kod frontend i backend strane

# Frontend

## F-1 Signup i Login forme

### Profesor

- Signup forma.
- Validacija unetih podataka.
- Moraju imati sva polja popunjena.
- Mora zadovoljavati potrebe modela.
- Profesor bira predmete koje predaje (moze da ih izabere vise)
- Slanje profesora serveru
- Prima odgovor u vidu da li je profesor napravljen ili ne
- Ukoliko jeste salje ga na login
- Ukoliko nije ispisuje gresku

### Student

- Signup forma.
- Validacija unetih podataka.
- Moraju imati sva polja popunjena.
- Mora zadovoljavati potrebe modela.
- Student bira svoja interesovanja (moze ih izabrati vise)
- Slanje studenta serveru
- Prima odgovor u vidu da li je student napravljen ili ne
- Ukoliko jeste salje ga na login
- Ukoliko nije ispisuje gresku

### Login

- Login forma
- Salju se podaci email/username i sifra
- Dobija se odgovor nazad
- U slucaju greske prikazati gresku
- Ako sve prodje glatko uzeti iz odgovora "type : [student, profesor]" vrednost i sacuvati je
- Uzeti takodje "token" i sacuvati ga
- Na osnovu te vrednosti cemo znati da li je korisnik profesor ili student i tako prikazati aplikaciju
- Interceptor koji ce za svaki HTTP request zakaciti token u Authentication header

## F-2 GET getAllProfesors

- getAllPrefesors?sort=rating&sortDirection=desc&filter={"priceFrom":100, "priceTo":200}
  - Vraca filtriran niz profesora sortiran po naznacenoj koloni i po naznacenom redosledu. Ukoliko ne postoji filter onda vraca sve profesore. Ukoliko ne postoji sort onda ih ne sortira
