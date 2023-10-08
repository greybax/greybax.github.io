# How to handle different versions of Core Data Models

#ios, #macos, #swiftui, #appstore, #development, #xcode, #english;

_October 7, 2023_

## Intro

As i mentioned earlier [I've started my own business](/posts/how-to-start-business-in-washington-state/). For now I'm working on different apps for AppStore (iOS/MacOS). I've encountered issues when migrating my data models between different versions, as I work on various apps for the AppStore (iOS/MacOS). In this post, I want to clarify the process for myself and hopefully help someone else who may find it useful.

## Data Migration

Apple provides extensive documentation, but it can be challenging to navigate, especially in the context of SwiftUI.
So I've found this article related to [Core Data Model Versioning and Data Migration
](https://developer.apple.com/library/archive/documentation/Cocoa/Conceptual/CoreDataVersioning/Articles/Introduction.html). But reading takes too much time and doesn't clarify too much.

So one of my common issues for data migrations that my app doesn't start anymore due to DB migration errors.
It happens because ordering in the process of Data Migration and Versioning matters.

So there are steps:
1. Select your DB -> `Editor` -> `Add Model Version...`
2. In popup window name your new model version and select `Based on Model` as latest one
3. After that do your changes with your models in this newly created model version.
4. `Editor` -> `Create NSManagedObject Subclass...`
5. In Settings of your Model select Model Version Current as your latest one where you've made changes
6. Build your project

Make sure that option `NSMigratePersistentStoresAutomaticallyOption: true` exists in your CoreData Manager file. This settings allows to merge DB Model migrations automatically. In most cases it will be enough except some specific cases where you need to migrate your models manually.

Following these steps should ensure that your project opens successfully without encountering issues during the database migration process.

Enjoy you Core Data Model migrations! ✌🏼
