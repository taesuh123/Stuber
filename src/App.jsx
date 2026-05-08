const { useEffect, useRef, useState } = React;

const HWS_THEME = { primary: "#F97316", secondary: "#4C1D95" };
const ODELLS_POND_ROAD_DEMO_POINT = { lat: 42.85600, lon: -76.99149 };

const HWS_STUDENT_HOUSING_ADDRESSES = [
  "1 Cloverleaf, Geneva, NY",
  "121 St. Clair Street, Geneva, NY",
  "133 St. Clair Street, Geneva, NY",
  "15 VerPlanck Street, Geneva, NY",
  "25 VerPlanck Street, Geneva, NY",
  "99 St. Clair Street, Geneva, NY",
  "402 Pulteney Street, Geneva, NY",
  "408 Pulteney Street, Geneva, NY",
  "412 Pulteney Street, Geneva, NY",
  "420 Pulteney Street, Geneva, NY",
  "730 South Main Street, Geneva, NY",
  "737 South Main Street, Geneva, NY",
  "746 South Main Street, Geneva, NY",
  "Bampton House, 720 South Main Street, Geneva, NY",
  "Bartlett Hall, 353 Pulteney Street, Geneva, NY",
  "Beta Sigma, 756 South Main Street, Geneva, NY",
  "Blackwell House, 160 St. Clair Street, Geneva, NY",
  "Brent House, 287 Pulteney Street, Geneva, NY",
  "Chi Phi, 573 South Main Street, Geneva, NY",
  "Comstock House, 168 St. Clair Street, Geneva, NY",
  "Delta Chi, 574 South Main Street, Geneva, NY",
  "Durfee Hall, 355 Pulteney Street, Geneva, NY",
  "Emerson Hall, Hamilton Street, Geneva, NY",
  "Farm House, 169 St. Clair Street, Geneva, NY",
  "Folwell House, 764 South Main Street, Geneva, NY",
  "Geneva Hall, 648 South Main Street, Geneva, NY",
  "Hale Hall, 351 Pulteney Street, Geneva, NY",
  "Hirshson House, St. Clair Street, Geneva, NY",
  "Jackson Hall, 445 Pulteney Street, Geneva, NY",
  "Kappa Alpha, 600 South Main Street, Geneva, NY",
  "Kappa Sigma, 584 South Main Street, Geneva, NY",
  "McCormick House, 183 Hamilton Street, Geneva, NY",
  "McDaniels House, 645 South Main Street, Geneva, NY",
  "Medbery Hall, 329 Pulteney Street, Geneva, NY",
  "Miller House, 169 St. Clair Street, Geneva, NY",
  "Phi Sigma Kappa, 704 South Main Street, Geneva, NY",
  "Potter Hall, 445 Pulteney Street, Geneva, NY",
  "Rees Hall, 445 Pulteney Street, Geneva, NY",
  "Shepard House, 141 St. Clair Street, Geneva, NY",
  "Sigma Phi, 624 South Main Street, Geneva, NY",
  "Sill House, 710 South Main Street, Geneva, NY",
  "Stewardson House, 780 South Main Street, Geneva, NY",
  "Trowbridge, 129 St. Clair Street, Geneva, NY",
  "Village at Odells Pond, 218 St. Clair Street, Geneva, NY",
  "Zappler House, 577 South Main Street, Geneva, NY",
];

const ADDRESS_BOOK = [
  "Current location",
  ...HWS_STUDENT_HOUSING_ADDRESSES,
  "Scandling Campus Center, 300 Pulteney St, Geneva, NY",
  "Lake Drum Brewery, 16 East Castle Street, Geneva, NY",
  "Odell's Pond Road, Geneva, NY",
  "Hobart and William Smith Colleges, 300 Pulteney St, Geneva, NY",
  "Medbery Hall, Pulteney St, Geneva, NY",
  "Warren Hunting Smith Library, Geneva, NY",
  "Gearan Center for the Performing Arts, Geneva, NY",
  "Bristol Field House, Geneva, NY",
  "Odell's Village, Geneva, NY",
];

const MAP_POINTS = [
  { key: "Lake Drum Brewery", lat: 42.8679699, lon: -76.9809210 },
  { key: "Odell's Pond Road", ...ODELLS_POND_ROAD_DEMO_POINT },
  { key: "Medbery Hall", lat: 42.8585291, lon: -76.9848679 },
  { key: "Scandling Campus Center", lat: 42.8585291, lon: -76.9848679 },
  { key: "Hobart and William Smith Colleges", lat: 42.8585291, lon: -76.9848679 },
  { key: "Warren Hunting Smith Library", lat: 42.8577932, lon: -76.9845825 },
  { key: "Gearan Center", lat: 42.8577932, lon: -76.9845825 },
  { key: "Bristol Field House", lat: 42.8565, lon: -76.98795 },
  { key: "Odell's Village", lat: 42.8553, lon: -76.99045 },
];

const KNOWN_STREETS = [
  {
    name: "South Main Street",
    points: [
      [42.852678, -76.984955],
      [42.853297, -76.984716],
      [42.854122, -76.984386],
      [42.854793, -76.984127],
      [42.855623, -76.983806],
      [42.856452, -76.983483],
      [42.857275, -76.983161],
      [42.858116, -76.982831],
      [42.858934, -76.982510],
      [42.859758, -76.982188],
      [42.860540, -76.981882],
      [42.861292, -76.981586],
    ],
  },
  {
    name: "Pulteney Street",
    points: [
      [42.8536431, -76.9830062],
      [42.8543086, -76.9832547],
      [42.8546699, -76.9833971],
      [42.8550552, -76.9835489],
      [42.8556463, -76.9837818],
      [42.8564102, -76.9840670],
      [42.8572713, -76.9843869],
      [42.8577932, -76.9845825],
      [42.8585291, -76.9848679],
      [42.8589232, -76.9850223],
      [42.8593467, -76.9851883],
      [42.8600035, -76.9854351],
      [42.8607036, -76.9856944],
    ],
  },
  {
    name: "East Castle Street",
    points: [
      [42.8678312, -76.9793786],
      [42.8678502, -76.9795685],
      [42.8678797, -76.9798323],
      [42.8679035, -76.9800111],
      [42.8679147, -76.9801120],
      [42.8679326, -76.9802742],
      [42.8679546, -76.9805111],
      [42.8679652, -76.9805688],
      [42.8679699, -76.9809210],
      [42.8679731, -76.9814140],
    ],
  },
  {
    name: "Odell's Pond Road",
    points: [
      [42.85786, -76.99172],
      [42.85730, -76.99166],
      [42.85686, -76.99158],
      [42.85644, -76.99150],
      [42.85604, -76.99148],
      [42.85558, -76.99154],
      [42.85518, -76.99170],
    ],
  },
  {
    name: "Saint Clair Street",
    points: [
      [42.85699, -76.99010],
      [42.85688, -76.98940],
      [42.85676, -76.98870],
      [42.85664, -76.98795],
      [42.85650, -76.98720],
      [42.85636, -76.98645],
      [42.85622, -76.98570],
      [42.85608, -76.98495],
      [42.85594, -76.98420],
      [42.85580, -76.98345],
    ],
  },
];

function southMainPickupPoint(fallback) {
  return snapToNamedStreet(fallback, "South Main Street") || fallback;
}

const SHARED_RIDE_KEY = "saferide-demo-ride-request";
const SCANDLING_CENTER_POINT = { lat: 42.8585291, lon: -76.9848679 };
const MAX_RIDE_RADIUS_MILES = 5;
const SCHOOL_VAN_CAPACITY = 10;
const DEV_LOGIN_DISABLED = true;
const DEMO_PICKUP_ADDRESS = "Lake Drum Brewery, 16 East Castle Street, Geneva, NY";
const DEMO_DROPOFF_ADDRESS = "Odell's Pond Road, Geneva, NY";
const DEMO_DROPOFF_POINT = ODELLS_POND_ROAD_DEMO_POINT;
const DEMO_STUDENT_LOCATION = { lat: 42.8679699, lon: -76.9809210 };
const DEMO_DRIVER_LOCATION = { lat: 42.8585291, lon: -76.9848679 };

const DEMO_PROFILES = [
  { role: "student", username: "student1", password: "student1", name: "Tae Suh" },
  { role: "student", username: "student2", password: "student2", name: "Maya Chen" },
  { role: "student", username: "demostudent", password: "demostudent", name: "Demo Student" },
  { role: "driver", username: "driver1", password: "driver1", name: "Tae S." },
  { role: "driver", username: "driver2", password: "driver2", name: "Alex Rivera" },
  { role: "driver", username: "demodriver", password: "demodriver", name: "Demo Driver" },
];
const PROFILES_KEY = "saferide-demo-profiles";

function getSchoolTheme() {
  return HWS_THEME;
}

function readSharedRide() {
  try {
    return JSON.parse(window.localStorage.getItem(SHARED_RIDE_KEY) || "null");
  } catch {
    return null;
  }
}

function setLocalSharedRide(ride) {
  window.localStorage.setItem(SHARED_RIDE_KEY, JSON.stringify(ride));
  window.dispatchEvent(new CustomEvent("saferide-shared-ride", { detail: ride }));
}

function readProfiles() {
  try {
    const stored = JSON.parse(window.localStorage.getItem(PROFILES_KEY) || "[]");
    return [...DEMO_PROFILES, ...stored.filter((profile) => !DEMO_PROFILES.some((demo) => demo.username === profile.username && demo.role === profile.role))];
  } catch {
    return DEMO_PROFILES;
  }
}

function upsertProfile(profile) {
  const stored = readProfiles().filter((candidate) => !DEMO_PROFILES.includes(candidate));
  const withoutExisting = stored.filter((candidate) => !(candidate.username === profile.username && candidate.role === profile.role));
  window.localStorage.setItem(PROFILES_KEY, JSON.stringify([...withoutExisting, profile]));
}

function displayNameFromUsername(username) {
  return username
    .trim()
    .split(/[._\s-]+/)
    .filter(Boolean)
    .map((part) => part[0].toUpperCase() + part.slice(1))
    .join(" ") || "SafeRide User";
}

function profileNumber(username) {
  const match = username.match(/(\d+)$/);
  return match ? match[1] : username.toLowerCase();
}

function isDemoStudentProfile(profile) {
  return profile?.role === "student" && profile.username.toLowerCase() === "demostudent";
}

function isDemoDriverProfile(profile) {
  return profile?.role === "driver" && profile.username.toLowerCase() === "demodriver";
}

function isPasswordFreeDemoLogin(role, username) {
  const cleanUsername = (username || "").trim().toLowerCase();
  return (role === "student" && cleanUsername === "demostudent") || (role === "driver" && cleanUsername === "demodriver");
}

function defaultPickupForProfile(profile, role) {
  if (isDemoStudentProfile(profile)) return DEMO_PICKUP_ADDRESS;
  return role === "student" ? "Current location" : "";
}

function defaultDropoffForProfile(profile) {
  return isDemoStudentProfile(profile) ? DEMO_DROPOFF_ADDRESS : "";
}

function defaultStudentLocationForProfile(profile) {
  return isDemoStudentProfile(profile) ? DEMO_STUDENT_LOCATION : null;
}

function defaultManualDropoffPointForProfile(profile) {
  return isDemoStudentProfile(profile) ? DEMO_DROPOFF_POINT : null;
}

function defaultDriverLocationForProfile(profile) {
  return isDemoDriverProfile(profile) ? DEMO_DRIVER_LOCATION : null;
}

function pairedDriverUsername(studentUsername) {
  if ((studentUsername || "").toLowerCase() === "demostudent") return "demodriver";
  return `driver${profileNumber(studentUsername || "")}`;
}

function pairedStudentUsername(driverUsername) {
  if ((driverUsername || "").toLowerCase() === "demodriver") return "demostudent";
  return `student${profileNumber(driverUsername || "")}`;
}

function rideAppliesToProfile(ride, activeProfile, activeRole) {
  if (!ride || ride.status === "idle") return false;
  if (!activeProfile) return false;

  if (activeRole === "student") {
    return ride.studentUsername === activeProfile.username || ride.riders?.some((rider) => rider.studentUsername === activeProfile.username);
  }

  if (activeRole === "driver") {
    return ride.targetDriverUsername === activeProfile.username || ride.acceptedDriverUsername === activeProfile.username;
  }

  return false;
}

function buildRideRider({
  studentUsername,
  studentName,
  pickup,
  dropoff,
  pickupPoint,
  dropoffPoint,
  passengers,
  studentLocation,
  priority = 0,
}) {
  return {
    id: `${studentUsername || "student"}-${Date.now()}-${priority}`,
    studentUsername,
    studentName,
    pickup,
    dropoff,
    pickupPoint,
    dropoffPoint,
    passengers: Math.max(1, Math.min(SCHOOL_VAN_CAPACITY, Number(passengers) || 1)),
    studentLocation,
    priority,
    pickupCompleted: false,
    dropoffCompleted: false,
  };
}

function ridersForRide(ride) {
  if (ride?.riders?.length) return ride.riders;
  if (!ride?.studentUsername) return [];
  return [
    buildRideRider({
      studentUsername: ride.studentUsername,
      studentName: ride.studentName,
      pickup: ride.pickup,
      dropoff: ride.dropoff,
      pickupPoint: ride.pickupPoint,
      dropoffPoint: ride.dropoffPoint,
      passengers: ride.passengers,
      studentLocation: ride.studentLocation,
      priority: 0,
    }),
  ];
}

function totalRidePassengers(ride) {
  return ridersForRide(ride).reduce((total, rider) => total + (Number(rider.passengers) || 1), 0);
}

function canAddStudentToRide(ride, request) {
  if (!ride || ride.status === "idle" || ride.status === "completed") return false;
  if (ride.driverPickedUp) return false;
  const requestedSeats = Number(request.passengers) || 1;
  return totalRidePassengers(ride) + requestedSeats <= SCHOOL_VAN_CAPACITY;
}

function addStudentToSharedRide(ride, request) {
  const riders = ridersForRide(ride);
  const nextRider = buildRideRider({ ...request, priority: riders.length });
  return {
    ...ride,
    riders: [...riders, nextRider],
    passengers: totalRidePassengers(ride) + nextRider.passengers,
    sharedRide: true,
  };
}

function sharedRideButtonLabel(ride, driverPickedUp) {
  const riders = ridersForRide(ride);
  if (!driverPickedUp) return "Confirm Pickup";
  if (riders.length <= 1) return "Finish Ride";

  const completedDropoffs = riders.filter((rider) => rider.dropoffCompleted).length;
  return completedDropoffs < riders.length - 1 ? `Complete Drop-off ${completedDropoffs + 1}` : "Finish Ride";
}

function advanceSharedRideAfterDriverAction(ride, driverPickedUp) {
  const riders = ridersForRide(ride);
  if (!driverPickedUp) {
    return {
      ...ride,
      riders: riders.map((rider, index) => (index === 0 ? { ...rider, pickupCompleted: true } : rider)),
      driverPickedUp: true,
    };
  }

  if (riders.length <= 1) {
    return { ...ride, status: "completed", completedAt: Date.now(), driverBacConfirmed: false, driverPickedUp: false };
  }

  const nextDropoffIndex = riders.findIndex((rider) => !rider.dropoffCompleted);
  const nextRiders = riders.map((rider, index) =>
    index === nextDropoffIndex ? { ...rider, pickupCompleted: true, dropoffCompleted: true } : rider
  );
  const rideComplete = nextRiders.every((rider) => rider.dropoffCompleted);

  return {
    ...ride,
    riders: nextRiders,
    status: rideComplete ? "completed" : "matched",
    completedAt: rideComplete ? Date.now() : ride.completedAt,
    driverBacConfirmed: !rideComplete,
    driverPickedUp: !rideComplete,
  };
}

function writeSharedRide(ride) {
  const nextRide = { ...ride, updatedAt: Date.now() };
  setLocalSharedRide(nextRide);
  fetch("/api/ride", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(nextRide),
  }).catch(() => {});
}

function clearSharedRide() {
  const nextRide = { status: "idle", pickup: "Current location", dropoff: "", passengers: 1, updatedAt: Date.now() };
  setLocalSharedRide(nextRide);
  fetch("/api/ride", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(nextRide),
  }).catch(() => {});
}

function mergeSharedRide(partial) {
  writeSharedRide({ ...(readSharedRide() || {}), ...partial });
}

async function readServerRide() {
  try {
    const response = await fetch("/api/ride", { cache: "no-store" });
    return await response.json();
  } catch {
    return null;
  }
}

function getMapPoint(address, fallback) {
  if (address === "Current location") return southMainPickupPoint(fallback);
  const match = MAP_POINTS.find((point) => address.includes(point.key));
  if (!match && address.includes("Pulteney")) return { lat: 42.8585291, lon: -76.9848679 };
  if (!match && address.includes("East Castle")) return { lat: 42.8679699, lon: -76.9809210 };
  return match || fallback;
}

function snapToNamedStreet(point, streetName) {
  const street = KNOWN_STREETS.find((knownStreet) => knownStreet.name === streetName);
  if (!point || !street) return null;

  const best = street.points.slice(0, -1).map((start, index) => ({
    point: projectPointToSegment([point.lat, point.lon], start, street.points[index + 1]),
  })).reduce((best, candidate) => {
    const candidateDistance = distanceDegrees([point.lat, point.lon], candidate.point);
    const bestDistance = distanceDegrees([point.lat, point.lon], best.point);
    return candidateDistance < bestDistance ? candidate : best;
  });

  return { lat: best.point[0], lon: best.point[1] };
}

function snapToKnownStreet(point) {
  if (!point) return point;

  const best = nearestKnownStreetProjection(point);
  return { lat: best.point[0], lon: best.point[1] };
}

function nearestKnownStreetName(point) {
  if (!point) return "near campus";
  return nearestKnownStreetProjection(point).street;
}

function pinnedLocationLabel(type, point) {
  return `Pinned ${type} location (${nearestKnownStreetName(point)})`;
}

function nearestKnownStreetProjection(point) {
  const best = KNOWN_STREETS.flatMap((street) =>
    street.points.slice(0, -1).map((start, index) => ({
      street: street.name,
      point: projectPointToSegment([point.lat, point.lon], start, street.points[index + 1]),
    }))
  ).reduce((best, candidate) => {
    const candidateDistance = distanceDegrees([point.lat, point.lon], candidate.point);
    const bestDistance = distanceDegrees([point.lat, point.lon], best.point);
    return candidateDistance < bestDistance ? candidate : best;
  });

  return best;
}

function projectPointToSegment(point, start, end) {
  const px = point[1];
  const py = point[0];
  const ax = start[1];
  const ay = start[0];
  const bx = end[1];
  const by = end[0];
  const dx = bx - ax;
  const dy = by - ay;
  const lengthSquared = dx * dx + dy * dy || 1;
  const t = Math.max(0, Math.min(1, ((px - ax) * dx + (py - ay) * dy) / lengthSquared));
  return [ay + t * dy, ax + t * dx];
}

function distanceDegrees(a, b) {
  return Math.hypot(a[0] - b[0], a[1] - b[1]);
}

function getRouteStats(pickup, dropoff) {
  const latMiles = (dropoff.lat - pickup.lat) * 69;
  const lonMiles = (dropoff.lon - pickup.lon) * 69 * Math.cos((pickup.lat * Math.PI) / 180);
  const miles = Math.max(0.2, Math.round(Math.hypot(latMiles, lonMiles) * 1.25 * 10) / 10);
  const minutes = Math.max(2, Math.round(miles * 4));
  return { miles: miles.toFixed(1), minutes };
}

function distanceMiles(a, b) {
  const latMiles = (b.lat - a.lat) * 69;
  const lonMiles = (b.lon - a.lon) * 69 * Math.cos((a.lat * Math.PI) / 180);
  return Math.hypot(latMiles, lonMiles);
}

function isWithinScandlingRadius(point) {
  return distanceMiles(SCANDLING_CENTER_POINT, point) <= MAX_RIDE_RADIUS_MILES;
}

function SafeRideMVP() {
  const [step, setStep] = useState("homescreen");
  const [netId, setNetId] = useState("");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState("");
  const [profile, setProfile] = useState(null);
  const [accountType, setAccountType] = useState("student");
  const [selectedSchool, setSelectedSchool] = useState("Hobart and William Smith Colleges");
  const [pickup, setPickup] = useState("Current location");
  const [dropoff, setDropoff] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);
  const [pickupStatus, setPickupStatus] = useState("idle");
  const [passengers, setPassengers] = useState(1);
  const [locationEnabled, setLocationEnabled] = useState(false);
  const [deviceLocation, setDeviceLocation] = useState(null);
  const [studentLocation, setStudentLocation] = useState(null);
  const [studentName, setStudentName] = useState("");
  const [driverLocation, setDriverLocation] = useState(null);
  const [driverBacConfirmed, setDriverBacConfirmed] = useState(false);
  const [driverPickedUp, setDriverPickedUp] = useState(false);
  const [manualPickupPoint, setManualPickupPoint] = useState(null);
  const [manualDropoffPoint, setManualDropoffPoint] = useState(null);
  const [mapNotice, setMapNotice] = useState("");

  const theme = getSchoolTheme(selectedSchool);

	  useEffect(() => {
	    function clearLocalRide() {
	      setPickup(defaultPickupForProfile(profile, accountType));
	      setDropoff(defaultDropoffForProfile(profile));
	      setPassengers(1);
	      setPickupStatus("idle");
	      setDriverBacConfirmed(false);
	      setDriverPickedUp(false);
	      setStudentLocation(defaultStudentLocationForProfile(profile));
	      setStudentName("");
	      setDriverLocation(defaultDriverLocationForProfile(profile));
	      setManualPickupPoint(null);
	      setManualDropoffPoint(defaultManualDropoffPointForProfile(profile));
	      setMapNotice("");
	    }

    function applySharedRide(ride) {
      if (!rideAppliesToProfile(ride, profile, accountType)) {
        clearLocalRide();
        return;
      }
	      if (isDemoStudentProfile(profile)) {
	        setPickup(DEMO_PICKUP_ADDRESS);
	        setDropoff(defaultDropoffForProfile(profile));
	        setManualPickupPoint(ride.pickupPoint || null);
	        setManualDropoffPoint(DEMO_DROPOFF_POINT);
        setPassengers(ride.passengers || 1);
        setPickupStatus(ride.status || "idle");
        setDriverBacConfirmed(Boolean(ride.driverBacConfirmed));
        setDriverPickedUp(Boolean(ride.driverPickedUp));
        setStudentLocation(DEMO_STUDENT_LOCATION);
        setStudentName(ride.studentName || profile.name || "Demo Student");
        setDriverLocation(ride.driverLocation || DEMO_DRIVER_LOCATION);
        return;
      }
      if (accountType === "student" && ride.riders?.length) {
        const activeRider = ride.riders.find((rider) => rider.studentUsername === profile.username);
        if (activeRider) {
          setPickup(activeRider.pickup || "");
          setDropoff(activeRider.dropoff || "");
          setManualPickupPoint(activeRider.pickupPoint || null);
          setManualDropoffPoint(activeRider.dropoffPoint || null);
          setPassengers(activeRider.passengers || 1);
          setPickupStatus(ride.status || "idle");
          setDriverBacConfirmed(Boolean(ride.driverBacConfirmed));
          setDriverPickedUp(Boolean(activeRider.pickupCompleted || ride.driverPickedUp));
          setStudentLocation(activeRider.studentLocation || null);
          setStudentName(activeRider.studentName || "");
          setDriverLocation(ride.driverLocation || null);
          return;
        }
      }
      setPickup(ride.pickup || "");
      setDropoff(ride.dropoff || "");
      setManualPickupPoint(ride.pickupPoint || null);
      setManualDropoffPoint(ride.dropoffPoint || null);
      setPassengers(ride.passengers || 1);
      setPickupStatus(ride.status || "idle");
      setDriverBacConfirmed(Boolean(ride.driverBacConfirmed));
      setDriverPickedUp(Boolean(ride.driverPickedUp));
      setStudentLocation(ride.studentLocation || null);
      setStudentName(ride.studentName || "");
      setDriverLocation(ride.driverLocation || null);
    }

    let lastAppliedAt = 0;

    function syncSharedRide() {
      const ride = readSharedRide();
      if (!ride || ride.updatedAt === lastAppliedAt) return;
      lastAppliedAt = ride.updatedAt;
      applySharedRide(ride);
    }

    async function syncServerRide() {
      const ride = await readServerRide();
      if (!ride || ride.updatedAt === lastAppliedAt) return;
      lastAppliedAt = ride.updatedAt;
      window.localStorage.setItem(SHARED_RIDE_KEY, JSON.stringify(ride));
      applySharedRide(ride);
    }

    syncSharedRide();
    syncServerRide();

    function handleStorage(event) {
      if (event.key !== SHARED_RIDE_KEY) return;
      syncSharedRide();
    }

    function handleLocalRide(event) {
      if (!event.detail || event.detail.updatedAt === lastAppliedAt) return;
      lastAppliedAt = event.detail.updatedAt;
      applySharedRide(event.detail);
    }

    const poll = window.setInterval(() => {
      syncSharedRide();
      syncServerRide();
    }, 500);
    window.addEventListener("storage", handleStorage);
    window.addEventListener("saferide-shared-ride", handleLocalRide);

    return () => {
      window.clearInterval(poll);
      window.removeEventListener("storage", handleStorage);
      window.removeEventListener("saferide-shared-ride", handleLocalRide);
    };
  }, [profile, accountType]);

	  useEffect(() => {
	    if (!profile) return;
	    const ride = readSharedRide();
	    if (rideAppliesToProfile(ride, profile, accountType)) return;
	
	    setPickup(defaultPickupForProfile(profile, accountType));
	    setDropoff(defaultDropoffForProfile(profile));
	    setPassengers(1);
	    setPickupStatus("idle");
	    setDriverBacConfirmed(false);
	    setDriverPickedUp(false);
	    setStudentLocation(defaultStudentLocationForProfile(profile));
	    setStudentName("");
	    setDriverLocation(defaultDriverLocationForProfile(profile));
	    setManualPickupPoint(null);
	    setManualDropoffPoint(defaultManualDropoffPointForProfile(profile));
	    setMapNotice("");
	  }, [profile, accountType]);
	
	  useEffect(() => {
	    if (!locationEnabled || !navigator.geolocation) return undefined;
	    if (isDemoStudentProfile(profile) || isDemoDriverProfile(profile)) return undefined;

    const watchId = navigator.geolocation.watchPosition(
      (position) => {
        const nextLocation = {
          lat: position.coords.latitude,
          lon: position.coords.longitude,
          accuracy: position.coords.accuracy,
          updatedAt: Date.now(),
        };
        setDeviceLocation(nextLocation);
        if (accountType === "student") {
          setStudentLocation(nextLocation);
          window.__lastSafeRideStudentLocation = nextLocation;
        }

        mergeSharedRide(accountType === "driver" ? { driverLocation: nextLocation } : { studentLocation: nextLocation });
      },
      () => {},
      { enableHighAccuracy: true, maximumAge: 2500, timeout: 10000 }
    );

    return () => navigator.geolocation.clearWatch(watchId);
	  }, [locationEnabled, accountType, profile]);

  return (
    <div className="app-shell" style={{ "--primary": theme.primary, "--secondary": theme.secondary }}>
      <div className="phone-scale">
        <div className="phone">
          <div className="screen">
            {step === "homescreen" && <HomeScreen onOpen={() => setStep(locationEnabled ? "school" : "location")} />}

            {step === "location" && (
              <LocationPermissionScreen
                onEnable={() => {
                  if (navigator.geolocation) {
                    navigator.geolocation.getCurrentPosition(
                      (position) => {
                        setDeviceLocation({
                          lat: position.coords.latitude,
                          lon: position.coords.longitude,
                          accuracy: position.coords.accuracy,
                          updatedAt: Date.now(),
                        });
                        setStudentLocation({
                          lat: position.coords.latitude,
                          lon: position.coords.longitude,
                          accuracy: position.coords.accuracy,
                          updatedAt: Date.now(),
                        });
                        window.__lastSafeRideStudentLocation = {
                          lat: position.coords.latitude,
                          lon: position.coords.longitude,
                          accuracy: position.coords.accuracy,
                          updatedAt: Date.now(),
                        };
                        setPickup("Current location");
                        setLocationEnabled(true);
                        setStep("school");
                      },
                      () => {
                        setLocationEnabled(true);
                        setStep("school");
                      },
                      { enableHighAccuracy: true, maximumAge: 2500, timeout: 10000 }
                    );
                  } else {
                    setStep("school");
                  }
                }}
              />
            )}

            {step === "school" && (
              <SchoolSelectScreen
                selectedSchool={selectedSchool}
                setSelectedSchool={setSelectedSchool}
                onContinue={() => setStep("login")}
              />
            )}

            {step === "login" && (
              <LoginOnlyScreen
                netId={netId}
                setNetId={setNetId}
                password={password}
                setPassword={setPassword}
                selectedSchool={selectedSchool}
                theme={theme}
                accountType={accountType}
                setAccountType={setAccountType}
                loginDisabled={DEV_LOGIN_DISABLED}
	                loginError={loginError}
	                onBack={() => setStep("school")}
	                onLogin={() => {
	                  const cleanUsername = netId.trim() || (accountType === "driver" ? "driver1" : "student1");
	                  const passwordFreeDemo = isPasswordFreeDemoLogin(accountType, cleanUsername);
	                  const matchedProfile = readProfiles().find(
	                    (candidate) =>
	                      candidate.role === accountType &&
	                      candidate.username.toLowerCase() === cleanUsername.toLowerCase() &&
	                      (DEV_LOGIN_DISABLED || passwordFreeDemo || candidate.password === password)
	                  );
	
	                  if (!DEV_LOGIN_DISABLED && (!cleanUsername || (!passwordFreeDemo && !password))) {
	                    setLoginError(passwordFreeDemo ? "Enter a username." : "Enter a username and password.");
	                    return;
	                  }

                  let nextProfile = matchedProfile;
                  if (!nextProfile) {
	                    nextProfile = {
	                      role: accountType,
	                      username: cleanUsername,
	                      password: DEV_LOGIN_DISABLED || passwordFreeDemo ? "" : password,
	                      name: displayNameFromUsername(cleanUsername),
	                    };
                    upsertProfile(nextProfile);
                  }

	                  setProfile(nextProfile);
	                  setPickup(defaultPickupForProfile(nextProfile, accountType));
	                  setDropoff(defaultDropoffForProfile(nextProfile));
	                  setPassengers(1);
	                  setPickupStatus("idle");
	                  setDriverBacConfirmed(false);
	                  setDriverPickedUp(false);
	                  setStudentLocation(defaultStudentLocationForProfile(nextProfile));
	                  setDriverLocation(defaultDriverLocationForProfile(nextProfile));
	                  setManualPickupPoint(null);
	                  setManualDropoffPoint(defaultManualDropoffPointForProfile(nextProfile));
	                  setMapNotice("");
	                  if (isDemoStudentProfile(nextProfile)) {
	                    window.__lastSafeRideStudentLocation = DEMO_STUDENT_LOCATION;
	                  }
	                  if (DEV_LOGIN_DISABLED || passwordFreeDemo) setPassword("");
	                  if (isDemoStudentProfile(nextProfile)) {
	                    writeSharedRide({
	                      status: "idle",
	                      pickup: DEMO_PICKUP_ADDRESS,
	                      dropoff: DEMO_DROPOFF_ADDRESS,
	                      pickupPoint: null,
	                      dropoffPoint: DEMO_DROPOFF_POINT,
	                      passengers: 1,
	                      studentUsername: nextProfile.username,
	                      studentName: nextProfile.name,
	                      targetDriverUsername: "demodriver",
	                      studentLocation: DEMO_STUDENT_LOCATION,
	                      driverLocation: DEMO_DRIVER_LOCATION,
	                      driverBacConfirmed: false,
	                      driverPickedUp: false,
	                    });
	                  }
	                  setLoginError("");
	                  setStep("home");
	                }}
              />
            )}

            {step === "home" && (
              <RideExperience
                role={accountType}
                selectedSchool={selectedSchool}
                pickup={pickup}
                setPickup={setPickup}
                dropoff={dropoff}
                setDropoff={setDropoff}
                pickupStatus={pickupStatus}
                setPickupStatus={setPickupStatus}
                passengers={passengers}
                setPassengers={setPassengers}
                menuOpen={menuOpen}
                setMenuOpen={setMenuOpen}
                setStep={setStep}
                theme={theme}
                locationEnabled={locationEnabled}
                setLocationEnabled={setLocationEnabled}
                deviceLocation={deviceLocation}
                studentLocation={studentLocation}
                studentName={studentName}
                driverLocation={driverLocation}
                driverBacConfirmed={driverBacConfirmed}
                setDriverBacConfirmed={setDriverBacConfirmed}
                driverPickedUp={driverPickedUp}
                setDriverPickedUp={setDriverPickedUp}
                publishRide={writeSharedRide}
                resetRide={clearSharedRide}
                profile={profile}
                manualPickupPoint={manualPickupPoint}
                setManualPickupPoint={setManualPickupPoint}
                manualDropoffPoint={manualDropoffPoint}
                setManualDropoffPoint={setManualDropoffPoint}
                mapNotice={mapNotice}
                setMapNotice={setMapNotice}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function LocationPermissionScreen({ onEnable }) {
  return (
    <div className="location-screen">
      <div className="logo">SR</div>
      <div className="location-copy">
        <h1>This app needs to use your location.</h1>
        <p className="muted small">
          SafeRide uses your device location to place you on the map, center pickup and drop-off, and track driver arrival.
        </p>
      </div>
      <PrimaryButton onClick={onEnable}>Enable Location</PrimaryButton>
    </div>
  );
}

function HomeScreen({ onOpen }) {
  return (
    <div className="home-screen">
      <div className="status-bar">
        <span>9:41</span>
        <span>5G 100%</span>
      </div>

      <div className="app-grid">
        <button onClick={onOpen} className="app-icon-button" aria-label="Open SafeRide">
          <div className="app-icon">SR</div>
          <span className="app-label">SafeRide</span>
        </button>
      </div>
    </div>
  );
}

function SchoolSelectScreen({ selectedSchool, setSelectedSchool, onContinue }) {
  return (
    <div className="intro-screen">
      <div>
        <div className="logo">SR</div>
        <h1>Welcome to SafeRide</h1>
        <p className="small muted" style={{ marginTop: 12 }}>
          Pilot campus: Hobart and William Smith Colleges in Geneva, NY.
        </p>
      </div>

      <div className="glass-panel stack">
        <div className="small muted">Choose your school</div>
        <select value={selectedSchool} onChange={(event) => setSelectedSchool(event.target.value)}>
          <option value="Hobart and William Smith Colleges">Hobart and William Smith Colleges</option>
        </select>
      </div>

      <PrimaryButton onClick={onContinue}>Continue</PrimaryButton>
    </div>
  );
}

function LoginOnlyScreen({
  netId,
  setNetId,
  password,
  setPassword,
  selectedSchool,
  theme,
  accountType,
  setAccountType,
  loginDisabled,
  loginError,
  onBack,
  onLogin,
}) {
  return (
    <div className="login-screen">
      <div>
        <h1>{selectedSchool}</h1>
        <p className="small muted" style={{ marginTop: 8 }}>
          Log in with your school credentials.
        </p>
      </div>

      <div className="glass-panel stack">
        <select value={accountType} onChange={(event) => setAccountType(event.target.value)} aria-label="Choose account type">
          <option value="student">Student</option>
          <option value="driver">Driver</option>
        </select>
        <input
          value={netId}
          onChange={(event) => setNetId(event.target.value)}
          placeholder={accountType === "driver" ? "driver1" : "student1"}
        />
        <input type="password" value={password} onChange={(event) => setPassword(event.target.value)} placeholder="Password" />
        {loginError && <div className="login-error">{loginError}</div>}
        <div className="demo-credentials">
          {loginDisabled
            ? "Development mode: fields can be left blank for now."
            : "Demo accounts demostudent and demodriver do not need a password. Other profiles still require one."}
        </div>
      </div>

      <div className="button-row">
        <SecondaryButton onClick={onBack}>Back</SecondaryButton>
        <PrimaryButton theme={theme} onClick={onLogin}>
          Log In
        </PrimaryButton>
      </div>
    </div>
  );
}

function RideExperience({
  role,
  selectedSchool,
  pickup,
  setPickup,
  dropoff,
  setDropoff,
  pickupStatus,
  setPickupStatus,
  passengers,
  setPassengers,
  menuOpen,
  setMenuOpen,
  setStep,
  theme,
  locationEnabled,
  setLocationEnabled,
  deviceLocation,
  studentLocation,
  studentName,
  driverLocation,
  driverBacConfirmed,
  setDriverBacConfirmed,
  driverPickedUp,
  setDriverPickedUp,
  publishRide,
  resetRide,
  profile,
  manualPickupPoint,
  setManualPickupPoint,
  manualDropoffPoint,
  setManualDropoffPoint,
  mapNotice,
  setMapNotice,
}) {
	  const vehicleType = "School Van";
	
	  useEffect(() => {
	    if (role !== "student") return;
	    if (manualPickupPoint) return;
	    const defaultPickup = defaultPickupForProfile(profile, role);
	    if (pickup !== defaultPickup) {
	      setPickup(defaultPickup);
	    }
	  }, [role, pickup, setPickup, profile, manualPickupPoint]);

	  const visibleStudentLocation = isDemoStudentProfile(profile)
	    ? DEMO_STUDENT_LOCATION
	    : role === "student"
	      ? deviceLocation || studentLocation
	      : studentLocation;
	  const visibleDriverLocation = isDemoDriverProfile(profile) && driverPickedUp ? DEMO_STUDENT_LOCATION : isDemoDriverProfile(profile) ? DEMO_DRIVER_LOCATION : driverLocation;
	  const effectiveManualDropoffPoint = isDemoStudentProfile(profile) ? DEMO_DROPOFF_POINT : manualDropoffPoint;

  return (
    <>
      <Header selectedSchool={selectedSchool} role={role} onMenuOpen={() => setMenuOpen(true)} />
      {menuOpen && (
        <ProfileMenu
          selectedSchool={selectedSchool}
          role={role}
          profile={profile}
          onClose={() => setMenuOpen(false)}
          onLogout={() => {
            setMenuOpen(false);
            setPickupStatus("idle");
            setDriverBacConfirmed(false);
            setDriverPickedUp(false);
            resetRide();
            setStep("homescreen");
          }}
        />
      )}

      <MapBlock
        pickup={pickup}
        dropoff={dropoff}
        showDriver={role === "driver" || pickupStatus !== "idle"}
        pickupStatus={pickupStatus}
        locationEnabled={locationEnabled}
        onEnableLocation={() => setLocationEnabled(true)}
        driverBacConfirmed={driverBacConfirmed}
        driverPickedUp={driverPickedUp}
	        studentLocation={visibleStudentLocation}
	        driverLocation={visibleDriverLocation}
	        manualPickupPoint={manualPickupPoint}
	        manualDropoffPoint={effectiveManualDropoffPoint}
        mapNotice={mapNotice}
        onPickupPointChange={(point) => {
          if (!isWithinScandlingRadius(point)) {
            setMapNotice("Pickup must be within 5 miles of Scandling Center.");
            return false;
          }
          setManualPickupPoint(point);
          setPickup(pinnedLocationLabel("pickup", point));
          setMapNotice("");
          return true;
        }}
        onDropoffPointChange={(point) => {
          if (!isWithinScandlingRadius(point)) {
            setMapNotice("Drop-off must be within 5 miles of Scandling Center.");
            return false;
          }
          setManualDropoffPoint(point);
          setDropoff(pinnedLocationLabel("drop-off", point));
          setMapNotice("");
          return true;
        }}
      />

      {role === "student" ? (
        <StudentRideSheet
          pickup={pickup}
          setPickup={setPickup}
          dropoff={dropoff}
	          setDropoff={setDropoff}
	          manualPickupPoint={manualPickupPoint}
	          manualDropoffPoint={effectiveManualDropoffPoint}
          setManualDropoffPoint={setManualDropoffPoint}
          passengers={passengers}
          setPassengers={setPassengers}
          vehicleType={vehicleType}
          pickupStatus={pickupStatus}
          setPickupStatus={setPickupStatus}
          theme={theme}
          driverBacConfirmed={driverBacConfirmed}
          setDriverBacConfirmed={setDriverBacConfirmed}
          driverPickedUp={driverPickedUp}
          setDriverPickedUp={setDriverPickedUp}
          publishRide={publishRide}
          resetRide={resetRide}
          profile={profile}
          studentName={studentName}
        />
      ) : (
        <DriverRideSheet
          pickup={pickup}
          dropoff={dropoff}
          pickupStatus={pickupStatus}
          passengers={passengers}
          vehicleType={vehicleType}
          theme={theme}
          driverBacConfirmed={driverBacConfirmed}
          setDriverBacConfirmed={setDriverBacConfirmed}
          driverPickedUp={driverPickedUp}
          setDriverPickedUp={setDriverPickedUp}
          publishRide={publishRide}
          resetRide={resetRide}
          profile={profile}
          studentName={studentName}
        />
      )}
    </>
  );
}

function Header({ selectedSchool, role, onMenuOpen }) {
  return (
    <div className="header">
      <div>
        <div className="title">SafeRide</div>
        <div className="small muted truncate">{selectedSchool}</div>
        <div className="role-chip">{role === "driver" ? "Driver mode" : "Student rider"}</div>
      </div>
      <button onClick={onMenuOpen} className="icon-button" aria-label="Open profile menu">
        <span aria-hidden="true">☻</span>
      </button>
    </div>
  );
}

function ProfileMenu({ selectedSchool, role, profile, onClose, onLogout }) {
  return (
    <div className="profile-overlay">
      <div className="profile-drawer">
        <div className="row" style={{ marginBottom: 20 }}>
          <div>
            <div className="title" style={{ fontSize: 18 }}>
              Profile
            </div>
            <div className="small muted truncate">{selectedSchool}</div>
          </div>
          <button onClick={onClose} className="icon-button" aria-label="Close profile menu">
            ×
          </button>
        </div>

        <div className="profile-card">
          <div className="row" style={{ justifyContent: "flex-start", gap: 12 }}>
            <div className="avatar">TS</div>
            <div>
              <div className="title">{profile?.name || "SafeRide User"}</div>
              <div className="small muted">{role === "driver" ? "Student Driver" : "Student Rider"}</div>
            </div>
          </div>
        </div>

        <div className="menu-list">
          <MenuItem icon="ID" title="School Account" subtitle="Manage campus login" />
          <MenuItem icon="$" title="Payment" subtitle="Ride fees and receipts" />
          <MenuItem icon="↺" title="Ride History" subtitle="Past SafeRide trips" />
          <MenuItem icon="!" title="Safety Center" subtitle="Driver checks and emergency info" />
          <MenuItem icon="•" title="Notifications" subtitle="Arrival and ride updates" />
          <MenuItem icon="?" title="Help & Support" subtitle="Report an issue or contact staff" />
        </div>

        <button onClick={onLogout} className="logout-button">
          Log Out
        </button>
      </div>
    </div>
  );
}

function MenuItem({ icon, title, subtitle }) {
  return (
    <button className="menu-item">
      <div className="menu-icon">{icon}</div>
      <div>
        <div className="title small">{title}</div>
        <div className="tiny muted">{subtitle}</div>
      </div>
    </button>
  );
}

function MapBlock({
  pickup,
  dropoff,
  showDriver,
  pickupStatus,
  locationEnabled,
  onEnableLocation,
  driverBacConfirmed,
  driverPickedUp,
  studentLocation,
  driverLocation,
  manualPickupPoint,
  manualDropoffPoint,
  mapNotice,
  onPickupPointChange,
  onDropoffPointChange,
}) {
  const hasRoute = pickup.trim() && dropoff.trim();
  const pickupFallback = studentLocation || { lat: 42.86762, lon: -76.98108 };
  const pickupPoint = hasRoute ? manualPickupPoint || getMapPoint(pickup, pickupFallback) : null;
  const dropoffPoint = hasRoute ? manualDropoffPoint || getMapPoint(dropoff, { lat: 42.8587, lon: -76.98405 }) : null;
  const driverLabel = pickupStatus === "matched" ? "Driver nearby" : "Driver on the way";

  return (
    <div className="map-block">
      <LiveDirectionsMap
        pickupPoint={pickupPoint}
        dropoffPoint={dropoffPoint}
        showDriver={Boolean(hasRoute && showDriver && driverBacConfirmed)}
        showStudent={Boolean(hasRoute && !driverPickedUp)}
        driverPickedUp={driverPickedUp}
        driverLabel={driverLabel}
        studentLocation={studentLocation}
        driverLocation={driverLocation}
        onPickupPointChange={onPickupPointChange}
        onDropoffPointChange={onDropoffPointChange}
      />
      {mapNotice && <div className="map-notice">{mapNotice}</div>}
    </div>
  );
}

function LiveDirectionsMap({
  pickupPoint,
  dropoffPoint,
  showDriver,
  showStudent,
  driverPickedUp,
  driverLabel,
  studentLocation,
  driverLocation,
  onPickupPointChange,
  onDropoffPointChange,
}) {
  const containerRef = useRef(null);
  const mapRef = useRef(null);
  const layersRef = useRef([]);

  useEffect(() => {
    if (!containerRef.current || mapRef.current || !window.L) return;

    mapRef.current = L.map(containerRef.current, {
      attributionControl: false,
      zoomControl: false,
      dragging: true,
      scrollWheelZoom: true,
      doubleClickZoom: true,
      touchZoom: true,
    }).setView([42.8585, -76.9848], 15);

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      maxZoom: 19,
      className: "clean-osm-tiles",
    }).addTo(mapRef.current);
  }, []);

  useEffect(() => {
    let cancelled = false;
    if (!mapRef.current || !window.L) return undefined;

    async function drawRoute() {
      layersRef.current.forEach((layer) => layer.remove());
      layersRef.current = [];

      if (!pickupPoint || !dropoffPoint) {
        mapRef.current.setView([42.8585, -76.9848], 15);
        return;
      }

      const driverPickupLeg = showDriver && !driverPickedUp && driverLocation;
      const routeStartPoint = driverPickupLeg ? driverLocation : pickupPoint;
      const routeEndPoint = driverPickupLeg ? pickupPoint : dropoffPoint;

      let routeLatLngs = [
        [routeStartPoint.lat, routeStartPoint.lon],
        [routeEndPoint.lat, routeEndPoint.lon],
      ];
      let stats = getRouteStats(routeStartPoint, routeEndPoint);
      let snappedStart = [routeStartPoint.lat, routeStartPoint.lon];
      let snappedEnd = [routeEndPoint.lat, routeEndPoint.lon];

      try {
        const url = `https://router.project-osrm.org/route/v1/driving/${routeStartPoint.lon},${routeStartPoint.lat};${routeEndPoint.lon},${routeEndPoint.lat}?overview=full&geometries=geojson`;
        const response = await fetch(url);
        const data = await response.json();
        const route = data.routes?.[0];

        if (route?.geometry?.coordinates?.length) {
          routeLatLngs = route.geometry.coordinates.map(([lon, lat]) => [lat, lon]);
          if (data.waypoints?.[0]?.location) {
            snappedStart = [data.waypoints[0].location[1], data.waypoints[0].location[0]];
          }
          if (data.waypoints?.[1]?.location) {
            snappedEnd = [data.waypoints[1].location[1], data.waypoints[1].location[0]];
          }
          stats = {
            miles: (route.distance / 1609.344).toFixed(1),
            minutes: Math.max(1, Math.round(route.duration / 60)),
          };
        }
      } catch {
        // The app still visualizes the trip if the live directions service is unavailable.
      }

      if (cancelled) return;

      const map = mapRef.current;
      const pickupDisplayPoint = driverPickupLeg ? snappedEnd : snappedStart;
      const forcedEndPoint = [routeEndPoint.lat, routeEndPoint.lon];
      const routeDisplayEnd = driverPickupLeg ? snappedEnd : forcedEndPoint;
      routeLatLngs = trimRouteToSnappedEndpoints(routeLatLngs, snappedStart, routeDisplayEnd);
      const dropoffDisplayPoint = driverPickupLeg ? null : forcedEndPoint;
      const timeDisplayPoint = driverPickupLeg ? snappedEnd : forcedEndPoint;
      const highwayMasks = highwayShieldMasks().map((mask) =>
        L.rectangle(mask.bounds, {
          color: "#eef0f0",
          fillColor: "#eef0f0",
          fillOpacity: 0.96,
          opacity: 0.96,
          weight: 0,
          interactive: false,
        }).addTo(map)
      );
      const routeShadow = L.polyline(routeLatLngs, { color: "#fff", weight: 13, opacity: 0.96, lineCap: "round", lineJoin: "round" }).addTo(map);
      const routeLine = L.polyline(routeLatLngs, { color: "#050505", weight: 8, opacity: 1, lineCap: "round", lineJoin: "round" }).addTo(map);
      const pickupMarker = showStudent
        ? L.marker(pickupDisplayPoint, { icon: studentIcon(), draggable: true }).addTo(map)
        : L.marker(pickupDisplayPoint, { icon: endpointIcon(), draggable: true }).addTo(map);
      const pickupLabel = L.marker(pickupDisplayPoint, { icon: labelIcon("Pickup", "right") }).addTo(map);
      const dropoffMarker = dropoffDisplayPoint ? L.marker(dropoffDisplayPoint, { icon: endpointIcon(), draggable: true }).addTo(map) : null;
      const dropoffLabel = dropoffDisplayPoint ? L.marker(dropoffDisplayPoint, { icon: labelIcon("Drop-off", "left") }).addTo(map) : null;
      const timeMarker = L.marker(timeDisplayPoint, { icon: timeIcon(`${stats.miles} mi · ${stats.minutes} min`, "dropoff") }).addTo(map);

      pickupMarker.on("dragend", () => {
        const nextLatLng = pickupMarker.getLatLng();
        const accepted = onPickupPointChange?.({ lat: nextLatLng.lat, lon: nextLatLng.lng });
        if (accepted === false) pickupMarker.setLatLng(pickupDisplayPoint);
      });

      if (dropoffMarker) {
        dropoffMarker.on("dragend", () => {
          const nextLatLng = dropoffMarker.getLatLng();
          const accepted = onDropoffPointChange?.({ lat: nextLatLng.lat, lon: nextLatLng.lng });
          if (accepted === false) dropoffMarker.setLatLng(dropoffDisplayPoint);
        });
      }

      layersRef.current.push(...highwayMasks, routeShadow, routeLine, pickupMarker, pickupLabel, timeMarker);
      if (dropoffMarker) layersRef.current.push(dropoffMarker);
      if (dropoffLabel) layersRef.current.push(dropoffLabel);

      if (showDriver && driverLocation) {
        const driverMarker = L.marker([driverLocation.lat, driverLocation.lon], {
          icon: carIcon(),
        }).addTo(map);
        layersRef.current.push(driverMarker);
      }

      map.fitBounds(L.latLngBounds(routeLatLngs), {
        paddingTopLeft: [52, 52],
        paddingBottomRight: [52, 84],
        maxZoom: 16,
        animate: true,
      });
    }

    drawRoute();
    return () => {
      cancelled = true;
    };
  }, [
    pickupPoint?.lat,
    pickupPoint?.lon,
    dropoffPoint?.lat,
    dropoffPoint?.lon,
    showDriver,
    showStudent,
    driverPickedUp,
    driverLabel,
    studentLocation?.lat,
    studentLocation?.lon,
    driverLocation?.lat,
    driverLocation?.lon,
    onPickupPointChange,
    onDropoffPointChange,
  ]);

  return <div ref={containerRef} className="live-map" role="img" aria-label="Live map directions from pickup to drop-off" />;
}

function nearestRoutePoint(target, routeLatLngs) {
  return routeLatLngs.reduce((nearest, point) => {
    const currentDistance = Math.hypot(point[0] - target[0], point[1] - target[1]);
    const nearestDistance = Math.hypot(nearest[0] - target[0], nearest[1] - target[1]);
    return currentDistance < nearestDistance ? point : nearest;
  }, routeLatLngs[0] || target);
}

function trimRouteToSnappedEndpoints(routeLatLngs, snappedPickup, snappedDropoff) {
  const pickupIndex = nearestRouteIndex(snappedPickup, routeLatLngs);
  const dropoffIndex = nearestRouteIndex(snappedDropoff, routeLatLngs);
  const start = Math.min(pickupIndex, dropoffIndex);
  const end = Math.max(pickupIndex, dropoffIndex);
  const trimmed = routeLatLngs.slice(start, end + 1);
  if (pickupIndex > dropoffIndex) trimmed.reverse();
  trimmed[0] = snappedPickup;
  trimmed[trimmed.length - 1] = snappedDropoff;
  return trimmed;
}

function nearestRouteIndex(target, routeLatLngs) {
  return routeLatLngs.reduce((bestIndex, point, index) => {
    const currentDistance = Math.hypot(point[0] - target[0], point[1] - target[1]);
    const best = routeLatLngs[bestIndex];
    const bestDistance = Math.hypot(best[0] - target[0], best[1] - target[1]);
    return currentDistance < bestDistance ? index : bestIndex;
  }, 0);
}

function endpointDotStyle() {
  return {
    radius: 10,
    color: "#ffffff",
    weight: 4,
    fillColor: "#050505",
    fillOpacity: 1,
    opacity: 1,
  };
}

function endpointIcon() {
  return L.divIcon({
    className: "endpoint-dot-icon",
    html: "<span></span>",
    iconSize: [30, 30],
    iconAnchor: [15, 15],
  });
}

function highwayShieldMasks() {
  return [
    { bounds: [[42.85938, -76.98295], [42.86005, -76.98175]] },
    { bounds: [[42.85795, -76.98235], [42.85868, -76.98105]] },
    { bounds: [[42.85595, -76.98388], [42.85665, -76.98258]] },
    { bounds: [[42.86215, -76.98195], [42.86285, -76.98065]] },
  ];
}

function labelIcon(label, side) {
  return L.divIcon({
    className: `map-label-icon ${side === "left" ? "label-left" : "label-right"}`,
    html: `<b>${label}</b>`,
    iconSize: [82, 24],
    iconAnchor: side === "left" ? [86, 12] : [-12, 12],
  });
}

function timeIcon(text, placement = "center") {
  return L.divIcon({
    className: `map-time-icon ${placement === "dropoff" ? "time-at-dropoff" : ""}`,
    html: `<div>${text}</div>`,
    iconSize: [126, 34],
    iconAnchor: placement === "dropoff" ? [-14, 17] : [64, 17],
  });
}

function studentIcon() {
  return L.divIcon({
    className: "student-dot-icon",
    html: "<span>🎓</span>",
    iconSize: [30, 30],
    iconAnchor: [15, 15],
  });
}

function carIcon(label) {
  return L.divIcon({
    className: "car-dot-icon",
    html: `<div>🚘</div>${label ? `<b>${label}</b>` : ""}`,
    iconSize: [122, 44],
    iconAnchor: [20, 22],
  });
}

function StudentRideSheet({
  pickup,
  setPickup,
  dropoff,
  setDropoff,
  manualPickupPoint,
  manualDropoffPoint,
  setManualDropoffPoint,
  passengers,
  setPassengers,
  vehicleType,
  pickupStatus,
  setPickupStatus,
  theme,
  driverBacConfirmed,
  setDriverBacConfirmed,
  driverPickedUp,
  setDriverPickedUp,
  publishRide,
  resetRide,
  profile,
  studentName,
}) {
  return (
	    <div className="ride-sheet">
	      <Panel>
	        <AddressInput label="Pickup" value={pickup} onChange={() => {}} readOnly />
	        <AddressInput
	          label="Drop-off"
	          value={dropoff}
	          onChange={(value) => {
	            setManualDropoffPoint(null);
	            setDropoff(value);
	          }}
	        />
	      </Panel>

      {pickupStatus === "requesting" && (
        <Panel>
          <div className="row">
            <div>
              <div className="title">Finding a SafeRide driver</div>
              <div className="small muted">Checking nearby verified student drivers...</div>
            </div>
            <div className="spinner" />
          </div>
        </Panel>
      )}

      {pickupStatus === "matched" && driverBacConfirmed && <DriverCard theme={theme} vehicleType={vehicleType} driverPickedUp={driverPickedUp} />}

      {pickupStatus === "matched" && !driverBacConfirmed && (
        <Panel>
          <div className="row">
            <div>
              <div className="title">Driver completing BAC check</div>
              <div className="small muted">Driver is inserting the DOT-approved breathalyzer into their phone. You will see driver details once BAC is confirmed at 0.00.</div>
            </div>
            <div className="spinner" />
          </div>
        </Panel>
      )}

      {pickupStatus !== "matched" && (
        <>
          <PassengerControl passengers={passengers} setPassengers={setPassengers} vehicleType={vehicleType} />
          <PrimaryButton
	            disabled={pickupStatus === "requesting"}
	            onClick={() => {
		              const finalPickup = manualPickupPoint ? pickup : defaultPickupForProfile(profile, "student");
		              const finalDropoffPoint = isDemoStudentProfile(profile) ? DEMO_DROPOFF_POINT : manualDropoffPoint;
		              const finalStudentLocation = defaultStudentLocationForProfile(profile) || window.__lastSafeRideStudentLocation || null;
                  const riderRequest = {
                    pickup: finalPickup,
                    dropoff,
                    pickupPoint: manualPickupPoint,
                    dropoffPoint: finalDropoffPoint,
                    passengers,
                    studentUsername: profile?.username,
                    studentName: profile?.name,
                    studentLocation: finalStudentLocation,
                  };
                  const existingRide = readSharedRide();
                  const shouldJoinExistingRide =
                    !isDemoStudentProfile(profile) &&
                    existingRide?.targetDriverUsername === pairedDriverUsername(profile?.username) &&
                    canAddStudentToRide(existingRide, riderRequest);
	              setPickup(finalPickup);
	              setPickupStatus("requesting");
              setDriverBacConfirmed(false);
              setDriverPickedUp(false);
              if (shouldJoinExistingRide) {
                publishRide(addStudentToSharedRide(existingRide, riderRequest));
                window.setTimeout(() => setPickupStatus("matched"), 900);
                return;
              }
              const firstRider = buildRideRider({ ...riderRequest, priority: 0 });
              publishRide({
                status: "requesting",
	                pickup: finalPickup,
		                dropoff,
		                pickupPoint: manualPickupPoint,
		                dropoffPoint: finalDropoffPoint,
	                passengers,
                studentUsername: profile?.username,
	                studentName: profile?.name,
	                targetDriverUsername: pairedDriverUsername(profile?.username),
	                studentLocation: finalStudentLocation,
	                driverLocation: isDemoStudentProfile(profile) ? DEMO_DRIVER_LOCATION : null,
	                driverBacConfirmed: false,
	                driverPickedUp: false,
                  riders: [firstRider],
                  activeStopIndex: 0,
              });
              window.setTimeout(() => setPickupStatus("matched"), 900);
              window.setTimeout(() => {
                publishRide({
                  status: "matched",
	                  pickup: finalPickup,
		                  dropoff,
		                  pickupPoint: manualPickupPoint,
		                  dropoffPoint: finalDropoffPoint,
	                  passengers,
                  studentUsername: profile?.username,
	                  studentName: profile?.name,
	                  targetDriverUsername: pairedDriverUsername(profile?.username),
	                  studentLocation: finalStudentLocation,
	                  driverLocation: isDemoStudentProfile(profile) ? DEMO_DRIVER_LOCATION : null,
	                  driverBacConfirmed: false,
                  driverPickedUp: false,
                  riders: [firstRider],
                  activeStopIndex: 0,
                });
              }, 900);
            }}
          >
            {pickupStatus === "requesting" ? "Requesting Pickup..." : "Request Pickup"}
          </PrimaryButton>
        </>
      )}

    </div>
  );
}

function DriverRideSheet({
  pickup,
  dropoff,
  pickupStatus,
  passengers,
  vehicleType,
  theme,
  driverBacConfirmed,
  setDriverBacConfirmed,
  driverPickedUp,
  setDriverPickedUp,
  publishRide,
  resetRide,
  profile,
  studentName,
}) {
  const currentSharedRide = readSharedRide() || {};
  const assignedRiders = ridersForRide(currentSharedRide);
  const hasSharedPassengers = assignedRiders.length > 1;
  const availableSeats = Math.max(0, SCHOOL_VAN_CAPACITY - totalRidePassengers(currentSharedRide));

  if (pickupStatus === "idle") {
    return (
      <div className="ride-sheet driver-sheet">
        <Panel>
          <div className="sheet-kicker">Driver app</div>
          <div className="driver-address">Waiting for ride requests</div>
          <div className="divider" />
          <div className="small muted">BAC confirmation appears only after a student requests a ride.</div>
          <div className="small muted">Shared rides can fill up to {SCHOOL_VAN_CAPACITY} seats when every request fits the route capacity.</div>
        </Panel>
        <PrimaryButton theme={theme}>Online</PrimaryButton>
      </div>
    );
  }

  if (!driverBacConfirmed) {
    return (
      <div className="ride-sheet driver-sheet">
        <Panel>
          <div className="sheet-kicker">Ride requested</div>
          <div className="driver-address">Confirm BAC to accept this SafeRide request.</div>
          <div className="divider" />
          <div className="small muted">Insert the DOT-approved breathalyzer into your phone, then confirm BAC at 0.00 before rider details are released.</div>
        </Panel>
        <PrimaryButton
          theme={theme}
          onClick={() => {
            setDriverBacConfirmed(true);
            publishRide({
              ...(readSharedRide() || {}),
              status: "matched",
              pickup,
              dropoff,
              passengers,
              acceptedDriverUsername: profile?.username,
	              acceptedDriverName: profile?.name,
	              targetDriverUsername: profile?.username,
		              driverLocation: isDemoDriverProfile(profile) ? DEMO_DRIVER_LOCATION : defaultDriverLocationForProfile(profile) || readSharedRide()?.driverLocation || null,
	              driverBacConfirmed: true,
	              driverPickedUp: false,
            });
          }}
        >
          Confirm BAC
        </PrimaryButton>
      </div>
    );
  }

  return (
    <div className="ride-sheet driver-sheet">
      {driverPickedUp ? (
        <Panel>
          <div className="sheet-kicker">Ride in progress</div>
            <div className="driver-address">Complete ride when the student has been dropped off.</div>
            {hasSharedPassengers && (
              <div className="small muted">
                Shared ride active. First rider kept pickup priority; remaining drop-offs complete one at a time.
              </div>
            )}
        </Panel>
      ) : (
        <>
          <Panel>
            <div className="sheet-kicker">Assigned student pickup</div>
            <div className="driver-address">{pickup}</div>
            <div className="divider" />
            <div className="sheet-kicker">Drop-off</div>
            <div className="driver-address">{dropoff}</div>
          </Panel>

          <div className="driver-grid">
            <div className="metric-card">
              <span>Passengers</span>
              <strong>{passengers}</strong>
            </div>
            <div className="metric-card">
              <span>Vehicle</span>
              <strong>{vehicleType}</strong>
            </div>
            <div className="metric-card wide">
              <span>BAC confirmation</span>
              <strong>0.00 confirmed</strong>
            </div>
          </div>

          <StudentPickupCard name={studentName || pairedStudentUsername(profile?.username || "")} pickup={pickup} />
          {!isDemoDriverProfile(profile) && (
            <Panel>
              <div className="sheet-kicker">Shared ride capacity</div>
              <div className="driver-address">{availableSeats} seats open in this school van</div>
              <div className="small muted">
                New student requests are added only when the full passenger count fits. The first student stays first for pickup.
              </div>
            </Panel>
          )}
        </>
      )}
      <PrimaryButton
        theme={theme}
        onClick={() => {
          const baseRide = readSharedRide() || {};
          if (driverPickedUp) {
            const advancedRide = advanceSharedRideAfterDriverAction(baseRide, true);
            if (advancedRide.status === "completed") {
              setDriverBacConfirmed(false);
              setDriverPickedUp(false);
              setLocalSharedRide({ ...advancedRide, updatedAt: Date.now() });
              resetRide();
            } else {
              publishRide(advancedRide);
            }
          } else {
            setDriverPickedUp(true);
            publishRide({
              ...advanceSharedRideAfterDriverAction(baseRide, false),
              status: "matched",
              pickup,
              dropoff,
              passengers,
              acceptedDriverUsername: profile?.username,
	              acceptedDriverName: profile?.name,
	              targetDriverUsername: profile?.username,
	              driverLocation: isDemoDriverProfile(profile) ? DEMO_STUDENT_LOCATION : defaultDriverLocationForProfile(profile) || readSharedRide()?.driverLocation || null,
	              driverBacConfirmed: true,
	              driverPickedUp: true,
            });
          }
        }}
      >
        {sharedRideButtonLabel(currentSharedRide, driverPickedUp)}
      </PrimaryButton>
    </div>
  );
}

function Panel({ children }) {
  return <div className="panel stack">{children}</div>;
}

function PassengerControl({ passengers, setPassengers, vehicleType }) {
  return (
    <div className="passenger-panel">
      <div className="passenger-label">Passengers</div>
      <div className="vehicle-chip">🚐 {vehicleType}</div>
      <div className="stepper">
        <button type="button" onClick={() => setPassengers(Math.max(1, passengers - 1))} aria-label="Decrease passengers">
          −
        </button>
        <strong>{passengers}</strong>
        <button type="button" onClick={() => setPassengers(Math.min(SCHOOL_VAN_CAPACITY, passengers + 1))} aria-label="Increase passengers">
          +
        </button>
      </div>
    </div>
  );
}

function AddressInput({ label, value, onChange, readOnly = false }) {
  const [focused, setFocused] = useState(false);
  const suggestions = ADDRESS_BOOK.filter((address) => {
    const query = value.trim().toLowerCase();
    return !query || address.toLowerCase().includes(query);
  }).slice(0, 5);

  return (
    <div className="address-input">
      <label>{label}</label>
      <input
        value={value}
        onChange={(event) => onChange(event.target.value)}
        onFocus={() => !readOnly && setFocused(true)}
        onBlur={() => window.setTimeout(() => setFocused(false), 120)}
        placeholder={`Enter ${label.toLowerCase()} address`}
        readOnly={readOnly}
      />

      {!readOnly && focused && suggestions.length > 0 && (
        <div className="suggestions">
          {suggestions.map((address) => (
            <button
              key={address}
              className="suggestion"
              onMouseDown={() => {
                onChange(address);
                setFocused(false);
              }}
            >
              <div className="small truncate">{address.split(",")[0]}</div>
              <div className="tiny muted truncate">{address}</div>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

function DriverCard({ theme, vehicleType, driverView = false, driverPickedUp = false }) {
  const [contactOpen, setContactOpen] = useState(false);

  if (contactOpen) {
    return <ContactPage theme={theme} onBack={() => setContactOpen(false)} />;
  }

  return (
    <div className="driver-card">
      <div className="row">
        <div className="row" style={{ justifyContent: "flex-start", gap: 12 }}>
          <div className="driver-photo">TS</div>
          <div>
            <div className="title">{driverView ? "Live student ride" : "Tae S."}</div>
            <div className="small muted">{driverView ? "GPS tracking from driver phone" : "4.9 · 124 rides"}</div>
          </div>
        </div>
        <div className="driver-actions">
          <div className="status-pill">{driverPickedUp ? "Ride in progress" : "Driver on the way"}</div>
        </div>
      </div>

      <div className="row small">
        <div className="pill">{vehicleType}</div>
        <div className="pill plate">NY · HWS 1024</div>
      </div>

      <div className="bac-confirmation">
        <div className="checkmark">✓</div>
        <div>
          <div className="bac-title">BAC confirmed at 0.00</div>
          <div className="bac-subtitle">Pre-shift breathalyzer test passed</div>
        </div>
      </div>

      <div className="driver-card-footer">
        <div className="eta-pill" style={{ color: theme.primary }}>ETA 3 min away</div>
        <button type="button" className="contact-button" onClick={() => setContactOpen(!contactOpen)}>
          Contact
        </button>
      </div>

    </div>
  );
}

function ContactPage({ theme, onBack }) {
  return (
    <div className="contact-page">
      <div className="contact-page-header">
        <button type="button" className="back-button" onClick={onBack} aria-label="Back to ride details">
          ←
        </button>
        <div>
          <div className="title small">1-800-000-0000</div>
          <div className="tiny muted">SafeRide driver contact</div>
        </div>
        <a className="call-link" href="tel:18000000000" style={{ backgroundColor: theme.primary }}>
          Call
        </a>
      </div>
      <div className="message-pane">
        <div className="message-bubble">Message thread opened inside SafeRide.</div>
        <div className="message-bubble outgoing">Hi, I am at the pickup spot.</div>
      </div>
      <input className="message-input" placeholder="Type a message..." />
    </div>
  );
}

function StudentPickupCard({ name, pickup }) {
  const initials = name
    .split(/\s+/)
    .filter(Boolean)
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase() || "ST";

  return (
    <div className="student-pickup-card">
      <div className="driver-photo">{initials}</div>
      <div>
        <div className="title">{name}</div>
        <div className="small muted">Student pickup</div>
        <div className="tiny muted truncate">{pickup}</div>
      </div>
    </div>
  );
}

function PrimaryButton({ children, onClick, theme, disabled = false }) {
  const buttonTheme = theme
    ? { "--button-bg": theme.primary, "--button-color": "#fff" }
    : { "--button-bg": "#fff", "--button-color": "#111" };

  return (
    <button className="primary-button" style={buttonTheme} onClick={onClick} disabled={disabled}>
      {children}
    </button>
  );
}

function SecondaryButton({ children, onClick }) {
  return (
    <button className="secondary-button" onClick={onClick}>
      {children}
    </button>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<SafeRideMVP />);
