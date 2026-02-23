# JeevaCare Patient App

JeevaCare patient-facing mobile app built with Expo Router and React Native. This repo contains the app UI, feature screens, and reusable components for patient services such as appointments, pharmacy, lab tests, and subscriptions.

## Tech stack

- Expo + React Native
- TypeScript
- Expo Router (file-based routing)

## Project structure

```
app/
   _layout.tsx
   (tabs)/
      _layout.tsx
      analytics.tsx
      index.tsx
      insurance.tsx
      mycard.tsx
      schedule.tsx
   onboardnauth/
      languageselector.tsx
      login.tsx
      onboard.tsx
      otpregister.tsx
      otpverify.tsx
      register.tsx
      registerform.tsx
      splash.tsx
   screens/
      cart.tsx
      family.tsx
      helpsupport.tsx
      language.tsx
      location.tsx
      menu.tsx
      notifications.tsx
      orders.tsx
      payments.tsx
      productdetail.tsx
      profile.tsx
      settings.tsx
      subscription.tsx
   services/
      doctor.tsx
      labtest.tsx
      pharmacy.tsx
      reports.tsx
assets/
   images/
      android-icon-background.png
      android-icon-foreground.png
      android-icon-monochrome.png
      arrow-down.svg
      body-scan.png
      cancer-ribbon.png
      cardio.png
      child.png
      consultant.png
      dentist.png
      diabetes.png
      doctoricon.png
      endocrine.png
      ent.png
      eye.png
      favicon.png
      full-body-complete-health-checkup.png
      gastro.png
      gastroenterology.png
      gyna.png
      heart.png
      icon.png
      image 44.png
      jeevacare-logo.png
      kidney-donor.png
      labsicon.png
      liver.png
      location-08.svg
      lungs.png
      mask.png
      meds.png
      menu-02.svg
      nepro.png
      neuro.png
      notification-01.svg
      onboard1.png
      onboard2.png
      onboard3.png
      organ.png
      ortho.png
      painmgt.png
      partial-react-logo.png
      pharmacyicon.png
      physican.png
      psychiatrist.png
      pulmo.png
      react-logo.png
      react-logo@2x.png
      react-logo@3x.png
      reporticon.png
      rx.png
      search-02.svg
      skin.png
      splash-icon.png
      supplement.png
      surgeon.png
      technician.png
      urologist.png
      white-logo (1).png
      white-logo.png
components/
   adsbanner.tsx
   bookascan.tsx
   doctorcategory.tsx
   homeheader.tsx
   labtestcategory.tsx
   labtestpackages.tsx
   nearby.tsx
   pharmacycategory.tsx
   pharmacyproducts.tsx
   recommeddoctor.tsx
   uploadprescription.tsx
```

## Getting started

1. Install dependencies

   ```bash
   npm install
   ```

2. Start the app

   ```bash
   npx expo start
   ```

3. Run on device/emulator

- Expo Go for quick testing
- Android emulator / iOS simulator
- Development build for native modules

## Scripts

- `npm run lint`: run lint checks
- `npm run reset-project`: reset to a clean starter app

## Notes

- Routing lives under `app/` and follows Expo Router conventions.
- Add new screens by creating files under `app/`.

## License

Proprietary. Internal use only.
