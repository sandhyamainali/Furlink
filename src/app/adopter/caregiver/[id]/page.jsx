"use client";
import Image from "next/image";
import Link from "next/link";

export default function CaregiverProfile({ params }) {
  const caregiver = {
    id: params.id,
    image: "/img/caregiver1.jpg",
    name: "Sunaina Dhakal",
    experience: "4 Years",
    location: "Jorpati, Kathmandu",
    about:
      "I love animals and have been fostering and caring for pets for over 4 years. I provide a loving and comfortable environment. I treat every pet like family.",
    petsHandled: [
      { name: "Max", image: "/img/dog1.jpeg" },
      { name: "Luna", image: "/img/cat1.jpg" },
      { name: "Charlie", image: "/img/dog2.webp" },
    ],
  };

  return (
    <div className="bg-[#fff7ec] min-h-screen px-6 py-10">
      <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow p-8">

        {/* Profile Header */}
        <div className="flex gap-6 items-center">
          <div className="relative w-32 h-32">
            <Image
              src={caregiver.image}
              alt={caregiver.name}
              fill
              className="object-cover rounded-full"
            />
          </div>
          <div>
            <h1 className="text-2xl font-semibold text-gray-800">{caregiver.name}</h1>
            <p className="text-gray-600">📍 {caregiver.location}</p>
            <p className="text-gray-600">🐾 Experience: {caregiver.experience}</p>
          </div>
        </div>

        {/* About Section */}
        <div className="mt-6 border-t pt-6">
          <h2 className="text-xl font-semibold text-gray-800">About Me</h2>
          <p className="text-gray-600 mt-2">{caregiver.about}</p>
        </div>

        {/* Pets Previously Cared For */}
        <div className="mt-8">
          <h2 className="text-xl font-semibold text-gray-800 mb-3">
            Pets I've Taken Care Of 🐶🐱
          </h2>

          <div className="flex gap-4 overflow-x-auto py-2">
            {caregiver.petsHandled.map((pet, index) => (
              <div key={index} className="min-w-[110px] text-center">
                <div className="relative w-24 h-24 mx-auto">
                  <Image
                    src={pet.image}
                    alt={pet.name}
                    fill
                    className="object-cover rounded-full"
                  />
                </div>
                <p className="text-sm font-medium mt-2 text-gray-700">{pet.name}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Contact Button */}
        <div className="mt-10 text-center">
          <Link href="/chat">
            <button className="bg-orange-600 hover:bg-orange-700 transition text-white font-medium px-6 py-2 rounded-lg shadow">
              Contact Caregiver
            </button>
          </Link>
        </div>

      </div>
    </div>
  );
}