<h1 align="center"> Holidaze </h1>
<p align="center">
  <img src ="https://ce.accelr.dev/wp-content/uploads/2022/05/Web-1920-–-1.png" width="700px"/>
</p>

A local tourism agency in Bergen is launching a new website called ‘Holidaze’ for visitors to the area to be able to find hotels, B&Bs and guesthouses, and for the accommodation owners to receive enquiries.

[View live site](https://holidaze-liart.vercel.app/)</br>
[Click here](https://holidaze-liart.vercel.app/admin) to go to admin section. <br/>
Username: noroff<br/>
Password: Admin123!321

## Description

The project required me to create a visitor side of the website where users can search accommodation and make enquiries, as well as the administration side where properties can be added and enquiries managed.

I created an API to store the data for the establishments, enquiries and contact submissions. I choose to use WordPress as a Headless CMS.

## Visitor site
- Homepage
- Search bar typeahead (auto dropdown with hotel names that match what has been typed)
- A results page with all hotels
- The hotel specific page which displays all details about the hotel
- An enquiry page either modal or separate page
- A contact page (different to enquiry page) which goes to the admin for Holidaze

## Admin section
- Create a login section that makes use of JWT tokens
- List of enquiries and new enquiries appear when user submits the form on the enquiry page
- List of messages from contact form
- The admin can create a new establishment

## Built With

- [Next.js](https://nextjs.org/)
- [Goober](https://goober.js.org/)
- [WordPress](https://wordpress.com/)

## Getting Started

### Installing

1. Clone the repo:

```bash
git clone https://github.com/Noroff-FEU-Assignments/project-exam-2-CharlotteEssajee
```

2. Install the dependencies:

```
npm i
```

### Running

To run the app, run the following commands:

```bash
npm run dev
```

Follow instrucions in terminal or go to:

```bash
http://localhost:3000/
```

To access admin section go to: http://localhost:3000/admin

```bash
username: noroff
```

```bash
password: Admin123!321
```

## Contributing

Make sure to open a pull request so code can be reviewed.

## Contact

Reach out to me!

[My Instagram page](https://instagram.com/essajee)

[My LinkedIn page](https://linkedin.com/in/charlotte-essajee-67aa39226)

## License

All images are downloaded from [Unsplash](https://unsplash.com/) 
