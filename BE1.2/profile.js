const { initializeDatabase } = require("../db/db.connect");
const fs = require("fs");
const Profile = require("./models/profile.models");

initializeDatabase();

const jsonData = fs.readFileSync("profiles.json", "utf-8");
const profilesData = JSON.parse(jsonData);

function seedData(){
    try{
        for(const profile of profilesData){
            const newProfile = new Profile({
                fullName: profile.fullName,
                username: profile.username,
                bio: profile.bio,
                profilePicUrl: profile.profilePicUrl,
                followingCount: profile.followingCount,
                followerCount: profile.followerCount,
                companyName: profile.companyName,
                location: profile.location,
                portfolioUrl: profile.portfolioUrl,
            });
            newProfile.save();
        }
    } catch (error){
        console.log("Error in Seeding the data", error);
    }
}
seedData();