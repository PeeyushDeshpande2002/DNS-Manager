
# DNS Manager

DNS Manager is a web application designed to provide a central dashboard for automating the management of domains and DNS records in bulk on AWS Route 53. The project uses the MERN stack for frontend, backend, and infrastructure layers while maintaining a modular design.

## Table of Contents

- [Features](#features)
- [Usage](#usage)
- [Enhancements](#enhancements)
- [Backend Integration](#backend-integration)
- [User Interface](#user-interface)
- [Resources](#resources)

## Features

- Centralized dashboard for managing domains and DNS records.
- Support for multiple DNS record types:
  - A (Address) Record
  - AAAA (IPv6 Address) Record
  - CNAME (Canonical Name) Record
  - MX (Mail Exchange) Record
  - NS (Name Server) Record
  - PTR (Pointer) Record
  - SOA (Start of Authority) Record
  - SRV (Service) Record
  - TXT (Text) Record
  - DNSSEC
- Forms/modals for adding, editing, and deleting DNS records.
- Filters and search options for easy data navigation.
- Graphical charts/metrics for domain and record type distribution.
- CSV or JSON bulk upload support for domain/records data.
- Status indicators, alerts, and notifications for user guidance.
- Secure user authentication and authorization.

## Usage

- **Dashboard**: View and manage domains and DNS records in a table format.
- **Forms/Modals**: Add, edit, and delete DNS record entries.
- **Bulk Uploads**: Upload domains and DNS records in bulk using CSV or JSON files.
- **Filters/Search**: Easily navigate through bulk data using filters and search options.
- **Metrics**: Visualize domain and record type distribution with graphical charts.

## Enhancements

- Added filters and search options for better navigation.
- Included graphical charts/metrics for domain and record type distribution.
- Implemented CSV or JSON bulk uploads for domain/records data.

## Backend Integration

- Established API endpoints to connect the UI with AWS Route 53.
- Implemented CRUD operations for DNS records using API calls.

## User Interface

- Status indicators, alerts, and notifications to guide users.
- Secure user authentication and authorization.

## Resources

- [AWS Route 53](https://aws.amazon.com/route53/)
