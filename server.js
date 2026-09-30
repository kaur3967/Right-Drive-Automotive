const express = require("express");
const { engine } = require("express-handlebars");
const path = require("path");
const helmet = require("helmet");
const multer = require("multer");
const { body, validationResult } = require("express-validator");

const app = express();
const PORT = 3000;

// -----------------------------
// Middleware
// -----------------------------

app.use(helmet());

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static(path.join(__dirname, "public")));

// -----------------------------
// Handlebars Setup
// -----------------------------

app.engine(
    "handlebars",
    engine({
        defaultLayout: "main",
        helpers: {
            reviewDate: function () {
                const date = new Date();
                date.setDate(date.getDate() + 3);

                return date.toLocaleDateString();
            }
        }
    })
);

app.set("view engine", "handlebars");
app.set("views", path.join(__dirname, "views"));

// -----------------------------
// File Upload Setup
// -----------------------------

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "public/uploads/");
    },

    filename: function (req, file, cb) {
        const uniqueName = Date.now() + "-" + file.originalname;
        cb(null, uniqueName);
    }
});

const upload = multer({
    storage: storage,

    limits: {
        fileSize: 5 * 1024 * 1024
    },

    fileFilter: function (req, file, cb) {
        const allowedTypes = [
            "image/jpeg",
            "image/png",
            "image/jpg"
        ];

        if (allowedTypes.includes(file.mimetype)) {
            cb(null, true);
        } else {
            cb(new Error("Only JPG, JPEG and PNG images are allowed."));
        }
    }
});

// -----------------------------
// Home / Complaint Form
// -----------------------------

app.get("/", (req, res) => {
    res.render("complaint");
});

// -----------------------------
// POST Complaint
// -----------------------------

app.post(
    "/complaint",

    upload.single("complaintImage"),

    [
        body("fullName")
            .trim()
            .notEmpty()
            .withMessage("Full name is required.")
            .isLength({ min: 2 })
            .withMessage("Full name must be at least 2 characters."),

        body("email")
            .trim()
            .isEmail()
            .withMessage("Please enter a valid email address."),

        body("phone")
            .trim()
            .notEmpty()
            .withMessage("Phone number is required."),

        body("vehicleMake")
            .trim()
            .notEmpty()
            .withMessage("Vehicle make is required."),

        body("vehicleModel")
            .trim()
            .notEmpty()
            .withMessage("Vehicle model is required."),

        body("vin")
            .trim()
            .notEmpty()
            .withMessage("VIN is required.")
            .isLength({ min: 11, max: 17 })
            .withMessage("VIN must be between 11 and 17 characters."),

        body("subject")
            .trim()
            .notEmpty()
            .withMessage("Complaint subject is required."),

        body("description")
            .trim()
            .notEmpty()
            .withMessage("Complaint description is required.")
            .isLength({ min: 10 })
            .withMessage("Description must be at least 10 characters.")
    ],

    (req, res) => {

        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(400).render("complaint", {
                errors: errors.array(),
                formData: req.body
            });
        }

        const complaint = {
            fullName: req.body.fullName,
            email: req.body.email,
            phone: req.body.phone,

            vehicleMake: req.body.vehicleMake,
            vehicleModel: req.body.vehicleModel,
            vin: req.body.vin,

            subject: req.body.subject,
            description: req.body.description,

            image: req.file
                ? "/uploads/" + req.file.filename
                : null
        };

        res.render("success", {
            complaint: complaint
        });
    }
);

// -----------------------------
// Start Server
// -----------------------------

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});