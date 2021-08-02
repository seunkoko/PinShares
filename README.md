# PINSHARES

![img](https://raw.githubusercontent.com/seunkoko/PinShares/main/public/pin-share-image.png)

This application was bootstrapped using CRA (create-react-app).

Hosted on heroku [here](https://pinshares.herokuapp.com/)


### Site Preview
---
<details>
<summary>Login / Signup</summary>

![img](https://raw.githubusercontent.com/seunkoko/PinShares/main/public/login.png)
</details>

<details>
<summary>All Pins</summary>

![img](https://raw.githubusercontent.com/seunkoko/PinShares/main/public/allpins.png)
</details>

<details>
<summary>Shared Pins</summary>

![img](https://raw.githubusercontent.com/seunkoko/PinShares/main/public/sharedpins.png)
</details>

<details>
<summary>My Pin</summary>

![img](https://raw.githubusercontent.com/seunkoko/PinShares/main/public/mypins.png)
</details>

<details>
<summary>Add Pin</summary>

![img](https://raw.githubusercontent.com/seunkoko/PinShares/main/public/addpins.png)
</details>

<details>
<summary>Update Pin</summary>

![img](https://raw.githubusercontent.com/seunkoko/PinShares/main/public/updatepin.png)
</details>

<details>
<summary>Share Pin with other Users</summary>

![img](https://raw.githubusercontent.com/seunkoko/PinShares/main/public/sharepin.png)
</details>


### Technologies Used
---

- Javascript
- React
- React Router
- Leaflet
- React Leaflet
- Node SASS
- React Bootstrap
- React Multiselect Dropdown
- React Pro Sidebar
- React Icons
- Flexbox


### Installation
---

- Clone the project repository.
- Run git clone https://github.com/seunkoko/PinShares.git.
- Change directory into the `PinShares` directory.
- Install all necessary packages in the package.json file by running the command `npm install`.
- Set up environment variables.
> Note: Checkout `.env.sample` in the root folder to do this.
- To start your app locally, run `npm start`.


#### Contributing
---

1. Fork this repository to your account.
2. Clone your repository: git clone https://github.com/seunkoko/PinShares.git.
4. Commit your changes: git commit -m "did something".
5. Push to the remote branch: git push origin new-feature.
6. Open a pull request.


### Limitations of my Solution
---
- Pins can only be shared with a capped number of users to manage efficiency
By the time the database grows large and users want to share pins to all users, it will be difficult to manage that
- The database structure currently will not allow selected query of pins for different regions
If the database struture was implemented keep track of regions each pin is created within, we might only need to get pins per regions where a user is viewing on the map
- Getting and Searching through large number of users cannot be supported when sharing pins

#### Consideration for 100 concurrent users
---
-

#### Consideration for 1000 concurrent users
---
-

#### Consideration for 100,000 concurrent users
---
-


### Future Futures
---
- Update pin names. Currently only pin locations can be updated.
- When sharing pins, users that have been shared with should not appear in the dropdown
- Push notifications
- Better display of Pin information
All Pins, Shared Pins and My Pins should be displayed to the screen, so that pins can be searched through easily and clicked on to then be located on the map
- Make sidebar menu active when clicked
- Displaying location name for a Pin along with other info in the popup
- Showing statistics of Pins created e.g. What regions you have highlighted most pins e.t.c
- Add loaders to the platform so when api calls are made, the user sees some form of activity
- Add message display to the app so users can see both success and error messages using packages like toastr


Copyright (c) 2021 Oluwaseun Owonikoko
