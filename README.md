# Cats of Thorkran

Cats of Thorkran is a test for a back-end developer at MagellanX.

## Instructions

This test should take around 60-90 minutes, you may submit whatever you have achieved after 90 minutes.

Please **do not fork this repo on github or open a pull request**.
If working on this remotely then please submit your solution via email in an archive, which can be created with the following `git` command:

```
git archive HEAD . -o solution.tar
```

### Setup

The [docker-compose.yml](docker-compose.yml) provided in the root directory can be used to bring up a postgres instance via `docker compose` with a command like `docker compose up postgres` or `npm run postgres`.
This image will create a user `admin` with a password `admin` and a database called `thorkran` which can be used for this test, the instance can be reached at the default `postgres` TCP port of `5432`.

Alternatively a postgres instance running on your own machine may be used, if so please create a database named `thorkran` and a user `admin` with password `admin` that is able to read and write data from this database and use these credentials in your code.

### Test

Write a node http server that listens on port `9898` and implements the rest API described in the following section.

You may use any libraries that you wish, they may be installed with `npm install -S <library-name>`.

The code may be written in files in the `src` directory and `npm start` may be used to start the server via `docker compose`.

Alternatively the code may be run on the local machine without `docker compose` by using `npm run start-api`

### Part one

Cats live on the island of Thorkran and this API is used to keep track of the cats.

Write an API at the path `/cat` suitable for submitting a cat to a postgres database from a json payload.
Cats look like the following in `json` and all cats have a regular structure:

```json
{
  "name": "Chirptar",
  "area": "Dreamland",
  "secretCode": "asafsnbqr"
}
```

At least two SQL tables should be created, `cats` and `areas`, please include the migrations or the SQL you use to create these tables somewhere in your source code.

When an `area` does not already exist in the database it may be created when the first cat that lives in this area is stored.

The other table should be called `cats` and would store each cat and provide a way to represent which area they live in and what their secret code is.

You may assume that area names, cat names and secret codes are strings with a length of at most 64 characters.

When a `cat` is submitted that contains a name that already exists in the database, then the data for that `cat` from the `cats` data should be updated to match the latest properties.

### Part two

Write an API at the path `/area` which also takes the area name after a further slash (i.e. `/area/:areaName`) that will return an object representing an area.

If the following cats were submitted to the previous API:

-
    ```json
    {
      "name": "Chirptar",
      "area": "Dreamland",
      "secretCode": "asafsnbqr"
    }
    ```
-
    ```json
    {
      "name": "ForkMaster",
      "area": "Dreamland",
      "secretCode": "bston"
    }
    ```

Then the API `/area/Dreamland` would return the following structure:

```json
{
    "name": "Dreamland",
    "cats": ["Chirptar", "ForkMaster"]
}
```

### Part three

The cats use **ultimate codes** to communicate, this is an important secret that one cat may communicate to another cat to prove that it is an authentic cat.
This number can be determined from the cat's `secretCode` and the number of letters in the cat's name.

First the `special number` must be determined.
This is the index of the first letter in the cat's `secretCode` where **this letter and the previous three letters are all different**.

Let's take the secret code used above `asafsnbqr` which belongs to the cat `Chirptar`.
For the first three letters, we don't have enough letters to determine if the special number has been found.

The next letter is the fourth letter `f`: together with the previous 3 letters we get `asaf`, since the letter `a` appears twice we know we have not found the special number.

After `f` we have the fifth letter `s`: `s` and the previous 3 letters are `safs`, since `s` appears twice we still don't have the special number.

The next letter is `n` which is the sixth letter, together with the previous 3 letters we have `afsn`. These letters are all different so the special number must be 6.

The **ultimate code** is determined by multiplying the number of letters in the cats name with the special number.
Since `Chirptar`'s name is `8` letters long, his secret code is `6` multiplied by `8` which gives `48`.

For part three the area API should also return a new property `ultimateCodeSum` which would be the sum of the **ultimate codes** for all cats living in that area.

For the data given above:

-
    ```json
    {
      "name": "Chirptar",
      "area": "Dreamland",
      "secretCode": "asafsnbqr"
    }
    ```
-
    ```json
    {
      "name": "ForkMaster",
      "area": "Dreamland",
      "secretCode": "bston"
    }
    ```

Then the API would return:

```json
{
    "name": "Dreamland",
    "cats": ["Chirptar", "ForkMaster"],
    "ultimateCodeSum": 88
}
```

Since `Chirptar`'s **ultimate code** is `48` (`6 * 8`), `ForkMaster`'s **ultimate code** is `40` (`4 * 10`), and `40 + 48 = 88`.
