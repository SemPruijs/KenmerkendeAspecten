interface Aspect {
    id: string,
    value: string
}

interface Chapter {
    title: string,
    aspects: [Aspect]
}

// mode should represent the type of value that the user is typing.   
enum LearnMode {
    Id,
    Value
}

enum UIMode {
    Learning,
    ChapterSelect
}
