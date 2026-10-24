Gem::Specification.new do |spec|
  spec.name          = "voxgig-sdk-dig-to-other-side-sdk"
  spec.version       = "0.0.1"
  spec.authors       = ["Voxgig"]
  spec.summary       = "Unofficial generated Ruby SDK for the Dig to the Other Side public API. Not affiliated with or endorsed by the upstream API provider."
  spec.description   = "Unofficial generated Ruby SDK for the Dig to the Other Side public API. Not affiliated with or endorsed by the upstream API provider."
  spec.license       = "MIT"
  spec.homepage      = "https://github.com/voxgig-sdk/dig-to-other-side-sdk"
  spec.metadata      = {
    "homepage_uri"          => "https://github.com/voxgig-sdk/dig-to-other-side-sdk",
    "source_code_uri"       => "https://github.com/voxgig-sdk/dig-to-other-side-sdk",
    "bug_tracker_uri"       => "https://github.com/voxgig-sdk/dig-to-other-side-sdk/issues",
    "changelog_uri"         => "https://github.com/voxgig-sdk/dig-to-other-side-sdk/blob/main/CHANGELOG.md",
    "rubygems_mfa_required" => "true"
  }

  spec.files         = Dir[
    "*.rb",
    "core/**/*.rb",
    "entity/**/*.rb",
    "feature/**/*.rb",
    "utility/**/*.rb",
    "LICENSE",
    "README.md",
    "REFERENCE.md"
  ]
  spec.require_paths = ["."]

  spec.required_ruby_version = ">= 3.0"
  spec.add_dependency "json"

  spec.add_development_dependency "minitest", "~> 5.0"
  spec.add_development_dependency "rake", "~> 13.0"
end
