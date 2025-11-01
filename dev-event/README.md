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


--API Route

-We use formData to get data from user
-This API route handles a POST request in Next.js to create a new event.
It first connects to MongoDB, then retrieves the submitted form data using req.formData().
The form data is converted into a plain JavaScript object with Object.fromEntries() so it can be easily processed.
Using the Event Mongoose model, the data is saved to the database. We import Event then use let createdEvent = await Event.create(event)
If the operation succeeds, a success message and the created event are returned in JSON format Using NextResponse.josn({message : 'message', events : createdEvent}, {status : 201}).
If an error occurs, it’s caught and returned with an appropriate status code and message.

--Buffer for Uploading Image in Next.js()
The basic logic is that when we upload an image in JavaScript, the image is stored in binary form. To access this binary data, we use await file.arrayBuffer(), which converts the image into a binary format. However, Next.js (which runs on Node.js) doesn’t directly work with ArrayBuffer; instead, it uses its own Buffer type. Therefore, we create a Node.js buffer using Buffer.from(arrayBuffer). This converts the image into a format that Next.js can understand and process as binary data.

--Cloudinary
-We have used cloudinary to upload the image to the server
-After that we added cloudinary URI
-In the next.config.ts file, I configured the images property and added a remotePatterns array. This allows Next.js to securely load and optimize images hosted on external sources such as Cloudinary.
-Within the remotePatterns array, I defined an object specifying the protocol and hostname. This tells Next.js which external domains are trusted for serving images. For example, by setting protocol: "https" and hostname: "res.cloudinary.com", I enabled Next.js to fetch and display images stored on Cloudinary using the next/image component without security or optimization issues.

-Function to upload image to cloudinary
we created function uploadresult that return pormise and for this we have imported library cloudinary and imported v2 as cloudinary and inside function we do cloudinary.uploader.upload_stream in that we pass object resource type that is image and folder name then we call the call back function that reutrn resolve if everything is resolved or reject if it has error finally we end this function by sending binary.


--Route to get teh specific Event

-To get the specific event we use []/route.tsx here when user interact by sending teh data they end slug we use that slug as params to gte value-We create Get function but befor thet we carete one variable that validate the value of slug
-We wrap the params in context object because it returns promise and we also definetype  of params as promise and we return slug of type string in that promise.
-In function for request we define _req because we are not requesting anything then we get params with type then we check it basic validation that if it does nto exist or it is not string or its value is not equals to zero
-In that if any this exist we return the fuction with error
-After that we do 2 level validation in that it convert that into uri and the reason for doin that is that if someone use url to navigate and add like tecch - feast-20 btu the url is tecch-feast-20 then the url will become tech%20-feast-20 and ackend will not understand what it is so we convert that using ddecodedURIComponent so this will convert tech%20-feast-20 to tech 20-feast-20 after that to remove extra space we do .trim() and then  to conver everything to lowercase we do .toLowerCase() thus we get the slug 
-After that we run the main validation check which we created using variable if slug pass that test we send it to the database for query usign findOne()
-But mongoDb return something with teh object like __v to remove thate we use -__v but we have to select that so taht we do .select("-__v") here - before means remove it and alsoo we conver that in string because select only understand string, after that we use .lean because it is still mongodb object nto javascript so to convert that into javascript we do .lean() then finally .exec() what it does is that it execute the slug like find data from mongodb and give it it ells the comand the the database query right now because without it the query is just created it will execute later.
Then we convert that into an event by defining its typeas Ievet which is the type of all event.
-Finally we give response using NexrResponse.json and if we receive any error we show then in catch error.

--Front end to display events
-To display single event in front end we use events/[slug]/age.tsx and in page we use params to get slug and after getting slug we use BASER_URL to get that data with the help of the url.
-After getting the data we destruct the data.
-Some data is repetative and in array so we create component for that.
-We have three componenet eventsagenda, eventstag and eventsdetailitem.
-Some are in array and in string so we parse them in array and get the first value and display it.

--Server Action 
-We created server action for form data where we use slug to find event.
-After that we create similarEVent variabel to query and find similar data and in that query what we search si await Event.find({_id : {$ne : event?.id}, tags : {$id : event.?tag}}). Here $ne means id that is not equal to event.id means findl all that is not equal to event.ts and then $in the loop through array and do query in mongodb automitically, like ["One", "Number"] it will find all event that has similar tag to One or Number.
-To show similar event we show that using event and run loop to show event card that we created
-But there when we do query there was a probelm after completeg query each data is coverted into array thus when we do query it si always better to use .lean() to conver into js and then .exce() to execute.
-To pass all event from bject we use {...event}

--Caching
-We use caching to cache the data we fo to the next.config.js and ake cahce component to true then we can cache any component we wantt or even the file.
-We just have to add use cheche befrthe conponent we want to add for cacheing.
-lafter we define cacheLife in hours oe minute.

--Submit Booking
-We create Booking action direclty from server actions where we paas eventId, slug and email
-To keep track records we use postHog.