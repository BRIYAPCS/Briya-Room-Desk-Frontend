// src/data/dummySites.js
// Dummy site and room data (safe names, kept human-readable)
// ✅ Do NOT pre-encode here — routing uses encodeURIComponent at navigation time.

import comingSoon from "../img/coming-soon.png";

const sites = [
  {
    id: 1,
    name: "Fort Totten",
    image: comingSoon,
    rooms: [
      { name: "CASAS/Conference Rm #134 Blue", image: comingSoon },
      { name: "Classroom #141 Blue (25)", image: comingSoon },
      { name: "Classroom #143 Blue (25)", image: comingSoon },
      { name: "Classroom #153 Yellow (25)", image: comingSoon },
      { name: "Classroom #159 Yellow (21)", image: comingSoon },
      { name: "Classroom Rm #139 Blue (25)", image: comingSoon },
      { name: "Garden Rm #144 Blue (6)", image: comingSoon },
      { name: "Lobby Room #146 (4)", image: comingSoon },
      { name: "NEST, Academic", image: comingSoon },
      { name: "NEST, Admin", image: comingSoon },
      { name: "Nook, Adika Rm #156 Yellow (4)", image: comingSoon },
      { name: "Nook, Kondi Rm #163 Yellow (4)", image: comingSoon },
      { name: "Nook, Mama #136 Blue (1)", image: comingSoon },
      { name: "Nook, Milo Rm #155 Yellow (4)", image: comingSoon },
      { name: "Registration Rm #131B Lobby (5)", image: comingSoon },
    ],
  },
  {
    id: 2,
    name: "Shepherd",
    image: comingSoon,
    rooms: [
      { name: "#207 AE Classrm (30)", image: comingSoon },
      { name: "#209 CASAS Rm (6)", image: comingSoon },
      { name: "#211 AE Classrm (30)", image: comingSoon },
      { name: "#218 AE Classrm (30)", image: comingSoon },
      { name: "#219 NEDP/CARES Rm (4)", image: comingSoon },
      { name: "#224 West Conf Rm (6)", image: comingSoon },
      { name: "#226 East Conf Rm (8)", image: comingSoon },
      { name: "#242 Zoom Rm 1 (1)", image: comingSoon },
      { name: "#243 Zoom Rm 2 (1)", image: comingSoon },
      { name: "VI Teaching RM #218A (1)", image: comingSoon },
    ],
  },
  {
    id: 3,
    name: "Ontario",
    image: comingSoon,
    rooms: [
      { name: "Bletzinger Classroom (25)", image: comingSoon },
      { name: "Green Classroom", image: comingSoon },
      { name: "IT/Testing room", image: comingSoon },
      { name: "Zoom Conf 2nd Floor", image: comingSoon },
      { name: "Zoom Spot (1) Inside Testing room", image: comingSoon },
    ],
  },
  {
    id: 4,
    name: "Georgia",
    image: comingSoon,
    rooms: [
      { name: "GA Classroom 79", image: comingSoon },
      { name: "GA Classroom 85", image: comingSoon },
      { name: "GA Lg Counseling Rm", image: comingSoon },
      { name: "GA Sm Counseling Rm", image: comingSoon },
    ],
  },
  {
    id: 5,
    name: "Georgia Annex",
    image: comingSoon,
    rooms: [
      { name: "1st floor (1-20)", image: comingSoon },
      { name: "2nd floor office (4)", image: comingSoon },
      { name: "Basement (1)", image: comingSoon },
    ],
  },
];

export default sites;
