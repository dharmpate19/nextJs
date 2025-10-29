Setting Up next.Js Project.
-Downloaded light Rays Component and upadted it according to the needs.
-By defult every function is a server component so here page is server component and we want to make button interactive from client side so we have to make button client component thus we created button a client component by using "use client".
-Whenever you see something in every page you add them in layout like navbar


--Database COnnection(How Dababase function is created and cahed is use to retrive same connected data instead of creaeting new connection)

Basically, global.mongoose acts as a reference that stores and remembers the cached MongoDB connection.

When the code first runs, we define a local cached object with both conn and promise set to null. Then, we assign this object to global.mongoose, so it can be reused later — even if the app reloads or the function runs again.

Once the connectToDatabase() function executes for the first time, it establishes a MongoDB connection. At that point, both conn and promise inside the cache get updated with the active connection and the connection promise.

Later, when the function runs again, even though a new cached variable is declared, it simply references the same global.mongoose object. This means it still has the previously stored connection data (conn and promise).

As a result, instead of creating a new MongoDB connection each time, the function detects that cached.conn already exists and reuses the same active connection — ensuring better performance and avoiding duplicate connections.

After establishing the connection, we attach Mongoose event listeners to keep track of the connection state — whether it’s connected, has an error, or gets disconnected.


--Model

-We created model for Events and booking we defind types of all and also we use pre defind hok sto validate value.
-we use generic while definingtypeso that we can export that schema using model.