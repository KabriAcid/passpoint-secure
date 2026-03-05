# PassPoint Secure Login System

A hybrid authentication system that combines **PassPoint graphical passwords** with **One-Time Password (OTP) verification** to provide stronger multi-factor authentication.

This project demonstrates a modern authentication approach where users authenticate by **clicking secret points on an image** and then verifying their identity using an **OTP sent via email**.

The current version focuses on the **frontend prototype**, built using React and TypeScript, with **mock data simulation** instead of a live backend.

---

## Project Overview

Traditional text-based passwords are vulnerable to attacks such as:

- Brute force attacks
- Dictionary attacks
- Shoulder surfing

To improve authentication security, this project integrates:

1. **Graphical Authentication (PassPoint)**
2. **Email-based One-Time Password (OTP)**

The system therefore implements a **two-layer authentication model**:
